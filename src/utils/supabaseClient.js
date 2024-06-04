import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zeaxuhspmjoehmocdxzn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplYXh1aHNwbWpvZWhtb2NkeHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNTIyMzMsImV4cCI6MjAzMjcyODIzM30.-2nCbS2MQsz1jXLV9QXgQcCfxl9goxYrJWV5Sa56qJo';

export const supabase = createClient(supabaseUrl, supabaseKey);
