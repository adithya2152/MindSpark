type QuizProps = {
  quiz: {
    qid: number;
    title: string;
    description: string;
    category: string;
    totalQuestions: number;
    hostID: number;
  };
};

export const Data = (props: QuizProps) => {
console.log("Received Quiz Data:", props.quiz);  

return (
  <div className="quiz-card">
    <p className="quiz-card-title">{props.quiz.title}</p>
    <p className="quiz-card-description">{props.quiz.description}</p>
    <p className="quiz-card-category"><strong>Category:</strong> {props.quiz.category}</p>
    <p className="quiz-card-questions"><strong>Total Questions:</strong> {props.quiz.totalQuestions}</p>
    <p className="quiz-card-host"><strong>Hosted By (HOSTID):</strong> {props.quiz.hostID}</p>
  </div>
);
};
