import { createClient } from '@supabase/supabase-js'

// ⚠️ Replace with your real values if different
const supabaseUrl = "https://vdiyivatviellibwhzxb.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkaXlpdmF0dmllbGxpYndoenhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MTA2MTcsImV4cCI6MjA5MjE4NjYxN30.gRmn6QhowP_Q6N45p7T-Jl91VAraXUmqj-4Cjmy0-Cs"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)