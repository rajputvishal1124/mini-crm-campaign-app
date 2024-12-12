import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

function CampaignHistory() {
  const [campaigns, setCampaigns] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCampaigns();
    }
  }, [isAuthenticated]);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/campaigns");
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    setIsAuthenticated(true);
    // You can also store the token in localStorage or send it to your backend
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed:", error);
  };

  if (!isAuthenticated) {
    return (
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Login with Google"
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        cookiePolicy={"single_host_origin"}
      />
    );
  }

  return (
    <div>
      <h2>Campaign History</h2>
      {campaigns.map((campaign) => (
        <div key={campaign._id}>
          <h3>{campaign.name}</h3>
          <p>Audience Size: {campaign.audienceSize}</p>
          <p>Sent: {campaign.sent}</p>
          <p>Failed: {campaign.failed}</p>
        </div>
      ))}
    </div>
  );
}

export default CampaignHistory;
