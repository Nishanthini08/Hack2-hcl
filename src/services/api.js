// Mock API Service logic for the Online Voting System.
// This simulates the Java Spring Boot backend until it is ready.

// Initial mock data
let mockUsers = [
  { id: 1, username: 'student1', password: 'password123', hasVoted: false },
  { id: 2, username: 'student2', password: 'password123', hasVoted: true }
];

let mockCandidates = [
  { id: 1, name: 'Alice Smith', party: 'Science Club', description: 'Advocating for better lab equipment.' },
  { id: 2, name: 'Bob Jones', party: 'Arts Club', description: 'More funding for creative programs.' },
  { id: 3, name: 'Charlie Brown', party: 'Sports Club', description: 'Upgrading the athletic facilities.' }
];

let mockVotes = [
  { candidateId: 2 } // student2 voted for candidate 2
];

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // A. User Login
  login: async (credentials) => {
    await delay(600);
    const user = mockUsers.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    
    if (user) {
      // Return a simulated token and user info
      return {
        token: `fake-jwt-token-${user.id}`,
        userId: user.id,
        hasVoted: user.hasVoted,
        username: user.username
      };
    }
    throw new Error('Invalid username or password');
  },

  // B. View Candidates
  getCandidates: async () => {
    await delay(300);
    return [...mockCandidates];
  },

  // C. Cast Vote
  castVote: async (candidateId, userId) => {
    await delay(800);
    // Find user
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('User not found');
    
    if (mockUsers[userIndex].hasVoted) {
      throw new Error('User has already voted!');
    }

    mockVotes.push({ candidateId });
    // Update user to voted
    mockUsers[userIndex].hasVoted = true;
    
    return { message: 'Vote cast successfully' };
  },

  // D. Display Results
  getResults: async () => {
    await delay(400);
    // Tally votes
    const results = mockCandidates.map(candidate => {
      const voteCount = mockVotes.filter(v => v.candidateId === candidate.id).length;
      return {
        candidateName: candidate.name,
        party: candidate.party,
        voteCount
      };
    });
    
    return results;
  }
};
