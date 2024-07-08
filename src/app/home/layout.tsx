import Header from "@/components/Header";
import "../styles/home.css";

 

export default function MainLayout({
  children,
  activeParticipants,
  main,
  topQuizes,
  userHistory,
  topUsers,
}: {
  children: React.ReactNode;
  activeParticipants: React.ReactNode;
  main: React.ReactNode;
  topQuizes: React.ReactNode;
  userHistory: React.ReactNode;
  topUsers:React.ReactNode;
}) {
  
  return (
    <div>
      <Header />
      {children}

      <div className="grid">
        <div className="item item1">{activeParticipants}</div>
        <div className="item item2">{main}</div>
        <div className="item item3">{topQuizes}</div>
        <div className="item item4">{userHistory}</div>
        <div className="item item5">{topUsers}</div>
      </div>
    </div>
  );
}
