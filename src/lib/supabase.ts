import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = 'https://lizkalsahbpmznkajjyr.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpemthbHNhaGJwbXpua2FqanlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NDA5NTcsImV4cCI6MjA1ODExNjk1N30.iv9rCs5qcaufM6hEPEl5QalcsvIu5sBHAr5YfGzD1KI';

// Validate credentials before creating the client
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Initializing Supabase client with:', {
  url: supabaseUrl.substring(0, 15) + '...', // Hide full URL for security
});

// Test the connection
(async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Supabase connection error:', error);
    } else {
      console.log('Supabase connection successful', data);
    }
  } catch (error) {
    console.error('Unexpected error while testing Supabase:', error);
  }
})();
