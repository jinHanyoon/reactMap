import React from "react";
import supabase from "../../supabase/supabaseApi";

export const emailLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
  
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      window.location.reload();

    }
    return data;
  };

//   export const logout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (!error) {
//       alert("로그아웃 되셨습니다")

//     }else{
//     }
//   };