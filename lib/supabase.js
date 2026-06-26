import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://moqciegoqfzrgwinvsmt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vcWNpZWdvcWZ6cmd3aW52c210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NjQ0ODUsImV4cCI6MjA5NjQ0MDQ4NX0.ORV74M_ue639EhR6lPv0zmkMV6veWYr4VMVgk0-dnAc' // your full legacy anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})