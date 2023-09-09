import { useState, useEffect, useContext, createContext } from "react";

import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

import { UserContextType, UserDetails } from "@/types";

interface Props {
  [propname: string]: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token || null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single();
      setUserDetails(data as UserDetails);

      if (error) {
        throw new Error(
          `Error retrieving user information from server. ${error.message}`,
        );
      }
    };

    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);
      getUserDetails();
      setIsLoadingData(false);
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }

  return context;
};
