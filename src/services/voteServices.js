// services/voteServices.js

"use client"
import { supabase } from '@/utils/supabaseClient';

export const addCandidate = async (firstName, lastName, position, biography, program) => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .insert([{ 
          first_name: firstName,
          last_name: lastName,
          position,
          biography,
          program
        }]);
  
      if (error) {
        console.error('Error adding candidate:', error);
        throw new Error(error.message);
      }
  
      return data;
    } catch (error) {
      console.error('Error in addCandidate function:', error);
      throw error;
    }
  };
  
  // Voter pour un candidat
  export const voteForCandidate = async (phoneNumber, candidateId) => {
    try {
      // Vérifier si l'utilisateur a déjà voté
      const { data: existingVote, error: existingVoteError } = await supabase
        .from('votes')
        .select('*')
        .eq('phoneNumber', phoneNumber)
        .single();
  
      if (existingVote) {
        alert('Vous avez déjà voté');
        throw new Error('User has already voted');
      }
  
      // Ajouter le vote
      const { data, error } = await supabase
        .from('votes')
        .insert([{ 
            phoneNumber: phoneNumber, 
            candidate_id: candidateId 
        }]);
  
      if (error) {
        console.error('Error voting for candidate:', error);
        throw new Error(error.message);
      }

      // update le user pour dire qu'il a voté
        const { data: userData, error: userError } = await supabase
            .from('users')
            .update({ Voted: true })
            .eq('phoneNumber', phoneNumber); // Use the correct column name 'phone'

        if (userError) {
            console.error('Error updating user data:', userError);
            throw new Error(userError.message);
        }
        
  
      return data;
    } catch (error) {
      console.error('Error in voteForCandidate function:', error);
      throw error;
    }
  };
  
  // Obtenir tous les candidats
  export const getCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*');
  
      if (error) {
        console.error('Error fetching candidates:', error);
        throw new Error(error.message);
      }
  
      return data;
    } catch (error) {
      console.error('Error in getCandidates function:', error);
      throw error;
    }
  };

  //get votes
    export const getVotes = async () => {
        try {
        const { data, error } = await supabase
            .from('votes')
            .select('*');
    
        if (error) {
            console.error('Error fetching votes:', error);
            throw new Error(error.message);
        }
    
        return data;
        } catch (error) {
        console.error('Error in getVotes function:', error);
        throw error;
        }
    };


export const getCandidateById = async (id) => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', id)
        .single();
  
      if (error) {
        console.error('Error fetching candidate:', error);
        throw new Error(error.message);
      }
  
      return data;
    } catch (error) {
      console.error('Error in getCandidateById function:', error);
      throw error;
    }
  };
  
