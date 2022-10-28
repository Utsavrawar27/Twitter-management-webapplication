import { useNavigate } from "react-router-dom";

export default function LoginContainer() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center mt-40">
      <div className="w-2/5">
        <div
          class="twitter btn flex justify-center items-center"
          onClick={handleLogin}
        >
          <div>
            <i class="fa fa-twitter fa-fw"></i> Login with Twitter
          </div>
        </div>
      </div>
    </div>
  );
}
