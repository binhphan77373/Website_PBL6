import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const Topbar = () => {
  return (
    <DashboardHeaderStyles>
      <div className="logo ml-8">
        <svg
          width={52}
          height={52}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={52} height={52} rx={10} fill="#2C2F32" />
          <path
            d="M15.186 23.2348C13.8487 20.8914 14.5874 17.9269 16.8359 16.6135C19.0844 15.3 21.9912 16.135 23.3285 18.4784L29.1985 28.7652C30.5358 31.1086 29.797 34.0731 27.5485 35.3865C25.3001 36.6999 22.3932 35.865 21.056 33.5215L15.186 23.2348Z"
            fill="url(#paint0_linear_2376_1140)"
          />
          <path
            d="M39.2349 20.6917C39.2349 23.3235 37.1345 25.4569 34.5435 25.4569C31.9525 25.4569 29.8521 23.3235 29.8521 20.6917C29.8521 18.0599 31.9525 15.9265 34.5435 15.9265C37.1345 15.9265 39.2349 18.0599 39.2349 20.6917Z"
            fill="url(#paint1_linear_2376_1140)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2376_1140"
              x1="16.8359"
              y1="16.6135"
              x2="27.441"
              y2="35.0019"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1DC071" />
              <stop offset={1} stopColor="#77D9AA" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_2376_1140"
              x1="34.5435"
              y1="15.9265"
              x2="34.5205"
              y2="25.2863"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1DC071" />
              <stop offset={1} stopColor="#77D9AA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="loader"></div>
    </DashboardHeaderStyles>
  );
};

export default Topbar;
