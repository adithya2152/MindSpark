 
import Header from "@/components/Header";
export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Header/>
        {children}
    </div>
       
     
  );
}
