import { useState, useEffect } from 'react';
import { getTeamMembers, getHackathons, getAchievements } from '../services/firebaseService';

export const useTeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMembers = async () => {
    setLoading(true);
    const result = await getTeamMembers();
    if (result.success) {
      setMembers(result.data);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return { members, loading, error, refetch: fetchMembers };
};

export const useHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHackathons = async () => {
    setLoading(true);
    const result = await getHackathons();
    if (result.success) {
      setHackathons(result.data);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  return { hackathons, loading, error, refetch: fetchHackathons };
};

export const useAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAchievements = async () => {
    setLoading(true);
    const result = await getAchievements();
    if (result.success) {
      setAchievements(result.data);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return { achievements, loading, error, refetch: fetchAchievements };
};