import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Admin() {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState('');
  const [party, setParty] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      const { data, error } = await supabase.from('candidates').select('*');
      if (error) console.error('Erreur de chargement des candidats:', error);
      else setCandidates(data);
    };
    fetchCandidates();
  }, []);

  const addCandidate = async () => {
    const { error } = await supabase.from('candidates').insert([
      { name: name, party: party }
    ]);
    if (error) {
      console.error('Erreur lors de l\'ajout du candidat:', error);
    } else {
      alert('Candidat ajouté avec succès!');
      setName('');
      setParty('');
    }
  };

  return (
    <div>
      <h1>Admin</h1>
      <h2>Ajouter un candidat</h2>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Parti"
        value={party}
        onChange={(e) => setParty(e.target.value)}
      />
      <button onPress={addCandidate}>Ajouter</button>
      <h2>Liste des candidats</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name} - {candidate.party}
          </li>
        ))}
      </ul>
    </div>
  );
}
