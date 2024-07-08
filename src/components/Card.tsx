import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => {
  const cardStyle = {
    padding: "20px", 
    margin: "10px", 
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    border: "1px solid black",
    borderRadius: "8px", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", 
    height: "100%", 
    backgroundColor: "#ffffff", 
  };

  return (
    <div style={cardStyle}>
      {children}
    </div>
  );
}

export default Card;
