import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { AlertCircle, CheckCircle2, UserCircle2 } from 'lucide-react';

export const Candidates = ({ user, setUser }) => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await api.getCandidates();
        setCandidates(data);
      } catch (err) {
        setError('Failed to load candidates.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const handleVote = async (candidateId) => {
    if (user.hasVoted) return;

    if (!window.confirm("Are you sure? You cannot change your vote later.")) return;

    setIsVoting(true);
    setError('');
    
    try {
      await api.castVote(candidateId, user.userId);
      setSuccess('Your vote has been recorded successfully!');
      setUser({ ...user, hasVoted: true });
      setTimeout(() => navigate('/results'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to cast vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          <p className="font-medium">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Election Candidates</h1>
          <p className="mt-2 text-slate-500 font-medium">Review the candidates and cast your vote.</p>
        </div>
        
        {user.hasVoted && (
          <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-sm font-medium text-green-700 border border-green-100">
            <CheckCircle2 className="h-5 w-5" />
            You have already voted
          </div>
        )}
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-start gap-3 border border-red-100/50">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-8 p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium flex items-start gap-3 border border-green-100/50 shadow-sm transition-all animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="flex flex-col group hover:-translate-y-1 transition-transform duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-4 ring-white shadow-md">
                <UserCircle2 size={56} opacity={0.8} />
              </div>
              <CardTitle className="text-xl mb-1">{candidate.name}</CardTitle>
              <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                {candidate.party}
              </span>
            </CardHeader>
            <CardContent className="flex-1 text-center">
              <p className="text-slate-600 leading-relaxed text-sm">"{candidate.description}"</p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                className="w-full text-base font-semibold shadow-md shadow-primary-600/10"
                onClick={() => handleVote(candidate.id)}
                disabled={isVoting || user.hasVoted}
                variant={user.hasVoted ? 'secondary' : 'primary'}
              >
                {isVoting ? 'Casting Vote...' : user.hasVoted ? 'Voted' : 'Vote for ' + candidate.name.split(' ')[0]}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
