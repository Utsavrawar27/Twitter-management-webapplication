import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { TWITTER_APP_TOKEN } from "../../utils/config";
import { useMergeState } from "../../utils/custom-hooks";
import { login } from "../../api";

export default function CallbackContainer() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [state, setState] = useMergeState({ isLoading: false });

  useEffect(() => {
    const asyncHandler = async () => {
      try {
        const code = searchParams.get("code");

        if (code) {
          setState({ isLoading: true });

          // const response = await login();

          // if (response?.success) {
          //   localStorage.setItem(TWITTER_APP_TOKEN);

          //   navigate("/dashboard");
          // }

          setState({ isLoading: false });
        }
      } catch (error) {
        setState({ isLoading: false });
        console.error(error);
      }
    };

    asyncHandler();
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-semibold">Just a moment</div>

        <div className="text-xl font-medium mt-4">
          We are connecting to your Twitter account...
        </div>

        <div className="mt-4">
          {state.isLoading && <Spinner loading={state.isLoading} />}
        </div>
      </div>
    </div>
  );
}
