import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleLoginBtn = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center">
      <Button
        onClick={handleGoogleLogin}
        isDisabled={loading}
        variant="outline"
        className={
          "px-15 flex gap-4 rounded-lg hover:bg-zinc-100 active:bg-zinc-200"
        }
      >
        {loading ? (
          "Please wait..."
        ) : (
          <>
            <span className="color-secondary">
              <FaGoogle />
            </span>

            <span className="color-secondary">Google</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default GoogleLoginBtn;
