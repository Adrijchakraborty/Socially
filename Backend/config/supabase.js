// supabaseService.js
import { createClient } from '@supabase/supabase-js'



const supabaseUrl = "https://ikquahwuzwcqycryiqok.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrcXVhaHd1endjcXljcnlpcW9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMDU1NjIsImV4cCI6MjA0Njg4MTU2Mn0.FGHspCya9OYasXVyFu1kTloC4-0QuAPzuv9Oo_9-zf8";

// console.log(process.env.SUPABASE_URL,process.env.SUPABASE_ANON_KEY);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
