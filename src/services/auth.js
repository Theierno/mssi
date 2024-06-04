"use client"
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/router';


// Inscrire un nouvel utilisateur avec OTP
export const inscription = async (phoneNumber, name, cni, birthDate, acceptTerms, ElecNumber) => {
    
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });

    if (error) {
      console.error('Error during OTP sign-in:', error);
      throw new Error(error.message);
    }

    // Ajoutez les informations supplémentaires de l'utilisateur dans la base de données
    const user = data?.user;

    if (user) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ 
          id: user.id, // ensure id is stored
          phone_number: phoneNumber, 
          name, 
          cni, 
          birth_date: birthDate, 
          accept_terms: acceptTerms, 
          elec_number: ElecNumber 
        }]);

      if (insertError) {
        console.error('Error inserting user data:', insertError);
        throw new Error(insertError.message);
      }
    }

    console.log("OTP" + JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Error in inscription function:', error);
    throw error;
  }
};

// Vérifier l'OTP
export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: 'sms'
    });

    if (error) {
      console.error('Error verifying OTP:', error);
      throw new Error(error.message);
    }
    else {
      alert('Code OTP vérifié avec succès!');
      // router.push('/PhotoUpload');
    }
    

    // Update the user's OTP status
    const user = data?.user;

    if (user) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ otp: otp })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating user data:', updateError);
        throw new Error(updateError.message);
      }

      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify(user));
      console.log("user stored in local"+JSON.stringify(user))
    }

    // console.log("Verified" + JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Error in verifyOTP function:', error);
    throw error;
  }
};

//logout
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  // Clear user data from localStorage
  localStorage.removeItem('user');
  // redirect to login page
  window.location.href = '/login';
};