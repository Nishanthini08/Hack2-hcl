import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BarChart3 } from 'lucide-react';

export const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await api.getResults();
        
        // Calculate total votes
        const total = data.reduce((acc, curr) => acc + curr.voteCount, 0);
        
        // Sort by highest vote count
        const sortedData = data.sort((a, b) => b.voteCount - a.voteCount);
        
        setResults(sortedData);
        setTotalVotes(total);
      } catch (error) {
        console.error('Failed to fetch results', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
    
    // Auto refresh every 5 seconds (simulation of live updates)
    const interval = setInterval(fetchResults, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading && results.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          <p className="font-medium">Tallying votes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary-600" />
            Live Election Results
          </h1>
          <p className="mt-2 text-slate-500 font-medium">Real-time vote tallies for all candidates.</p>
        </div>
        
        <div className="inline-flex items-center gap-2 rounded-xl bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 border border-primary-100">
          Total Votes Cast: {totalVotes}
        </div>
      </div>

      <div className="space-y-6">
        {results.map((result, index) => {
          const percentage = totalVotes === 0 ? 0 : Math.round((result.voteCount / totalVotes) * 100);
          const isWinner = index === 0 && result.voteCount > 0;
          
          return (
            <Card 
              key={result.candidateName} 
              className={`overflow-hidden transition-all duration-300 ${
                isWinner ? 'border-primary-300 shadow-md ring-1 ring-primary-500/20' : ''
              }`}
            >
              <CardContent className="p-0">
                <div className="flex items-center p-6">
                  {/* Rank indicator */}
                  <div className="mr-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100/80 text-xl font-bold text-slate-700 border border-slate-200/50">
                    #{index + 1}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900 flex items-center gap-2">
                          {result.candidateName}
                          {isWinner && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium border border-yellow-200">Leading</span>}
                        </h3>
                        <p className="text-sm font-medium text-slate-500">{result.party}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-2xl text-slate-900">{result.voteCount}</div>
                        <div className="text-sm font-medium text-slate-500">votes</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100 relative group">
                      <div
                        className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${
                          isWinner ? 'bg-primary-500' : 'bg-slate-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-end text-sm font-semibold text-slate-500">
                      {percentage}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
