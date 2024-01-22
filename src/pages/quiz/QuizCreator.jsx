import { json } from "react-router-dom";

const QuizCreator =(props) => {
    const {
        quizTitle,
        setQuizTitle,
        questions,
        setQuestions,
        setCodeInfo,
        HOST
    } = props

        // Function to add a new question object to the questions array
        const handleAddQuestion = () => {
            const newQuestion = {
                text: '',
                answers: [{ text: '', isCorrect: false }]
            };
            setQuestions([...questions, newQuestion]);
        };
    
        // Function to add a new answer object to a specific question
        const handleAddAnswer = (questionIndex) => {
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex].answers.push({ text: '', isCorrect: false });
            setQuestions(updatedQuestions);
        };
    
        // Function to handle changes in answer text for a specific question and answer
        const handleAnswerChange = (questionIndex, answerIndex, value) => {
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex].answers[answerIndex].text = value;
            setQuestions(updatedQuestions);
        };
    
        // Function to mark an answer as correct for a specific question
        const handleMarkCorrect = (questionIndex, answerIndex) => {
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex].answers.forEach((answer, index) => {
                if (index === answerIndex) {
                    answer.isCorrect = true;
                } else {
                    answer.isCorrect = false;
                }
            });
            setQuestions(updatedQuestions);
        };

        const handlerFetch = async () => {
            try {
                const response = await fetch(`${HOST}/quiz/create`, {
                    method:'post',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(
                        
                        {title: quizTitle,questions: 
                        questions.map(({ text, answers }) => 
                            ({text,answers: answers.map(({ text, isCorrect }) => ({ text, is_correct: isCorrect }))}
                        ))
                    }),
    
                });
                   
                    if (response.ok) {
                        const data = await response.json();
                        setCodeInfo(data.quiz)
                    }

            } catch (e) {
                console.log(e);
            } 
        };
        
    return (
        <div className="quizCreatorContainer">
        <div className='quizCreatorWpapper'>
        {/* Input field for quiz title */}
        <div className='form'>
            <h3>Название опроса:</h3>
            <input placeholder="Введите название опроса" value={quizTitle} onChange={(e) => { setQuizTitle(e.target.value) }} />
        </div>
        {/* Mapping through the questions array to render input fields for each question */}
        {questions.map((q, qIndex) => (
            <div key={qIndex} className='form'>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <h3>Вопрос {qIndex + 1}:</h3>
                <button style={{backgroundColor:'red'}} className='buttonAct' 
                onClick={()=>{
                    const updatedQuestions = [...questions];
                    updatedQuestions.splice(qIndex,1)
                    setQuestions(updatedQuestions)
                }}>Х</button>
                   

                </div>
                
                {/* Input field for the question text */}
                <input placeholder="Вопрос" value={q.question}     onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[qIndex].text = e.target.value; // Update the 'text' property
                    setQuestions(updatedQuestions);
                    }}/>
                {/* Mapping through the answers array to render input fields for each answer */}
                <div style={{display:'flex',flexWrap:'wrap', gap:'10px',padding:'0 22px', justifyContent: 'space-between' }}>{
                    q.answers.map((a, aIndex) => (
                        <div key={aIndex} >
                            <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                                <button style={{backgroundColor:'red' , padding:'4px',}} onClick={(aIndex)=>{
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[qIndex].answers.splice(aIndex, 1);
                                    setQuestions(updatedQuestions);
                                }}>x</button>
                            {/* Input field for the answer text */}
                            <input placeholder="Ответ" value={a.text} onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)} />
                            {/* Checkbox to mark the answer as correct */}
                            <div>
                                <input type="checkbox" checked={a.isCorrect} onChange={() => handleMarkCorrect(qIndex, aIndex)} />
                            </div>
                            </div>
                        </div>
                ))}
                </div>
                {/* Button to add a new answer for the current question */}
                <button className='buttonAct' onClick={() => handleAddAnswer(qIndex)}>Добавить ответ</button>
            </div>
        ))}
        {/* Button to add a new question */}
        <div style={{display:'flex', justifyContent:'center', padding:'10px 0'}}><button className='buttonAct' onClick={handleAddQuestion}>Добавить вопрос</button></div>
    
        </div>
        <div style={{padding:'10px 0'}}>
            <button  className='buttonAct' onClick={()=>{
                handlerFetch()
                }}>Создать</button>
        </div>

    </div>
    )

}

export default QuizCreator;