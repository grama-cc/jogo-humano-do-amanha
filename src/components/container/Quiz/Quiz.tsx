import React, { useState, useCallback,useMemo, useContext, useEffect } from 'react';

import { QuestionType } from 'types/types';
import SettingsContext from 'context/settingsContext';
import { QuizQuestions } from 'api/index';

import Menu from '../Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import QuestionList from 'components/container/QuestionList/QuestionList';
import Options from 'components/view/Options/Options';

import globalStyles from 'globals.module.scss';
import styles from './Quiz.module.scss';


const Quiz: React.FC = () => {
  const { step, setStep, userId, setUserId, setLoading } = useContext(SettingsContext);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState<number>(0);
  const [finished, setFinished]= useState<boolean>(false);

  const goToResearch = useCallback(() => {
    setStep('research')
  }, [setStep]);

  const goToPreResult = useCallback(() => {
    setStep('preresult')
  }, [setStep]);

  const getInitialQuestion = useCallback(() => {
    QuizQuestions.getQuestion(currentQuestionIndex).then(res => {
      const updatedQuestions = [...questions];
      updatedQuestions.push(res.pergunta);
      setQuestions(updatedQuestions);
      setUserId(res.id);
    });
  },[currentQuestionIndex, questions, setUserId]);

  useEffect(() => {
    if(!questions.length){
      getInitialQuestion();
    }
  }, [questions, getInitialQuestion]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex] || questions[currentQuestionIndex - 1] || null, [currentQuestionIndex, questions]);

  const getNextQuestion = useCallback((answer = null) => {
    QuizQuestions.getQuestion(currentQuestionIndex + 1, answer, userId, currentQuestion.alternativa).then(res => {
      if(res.pergunta && res.has_next_question){
        const updatedQuestions = [...questions];
        updatedQuestions.push({
          ...res.pergunta,
          resposta: ''
        });
        setQuestions(updatedQuestions);
      } else {
        setFinished(true);
        setLoading(false);
        goToPreResult();
      }
    });
    setCurrentQuestionsIndex(current => current + 1);
  },[currentQuestionIndex, userId, questions, currentQuestion, goToPreResult, setLoading]);

  const goToPreviousQuestion = useCallback(() => {
    const previousIndex = currentQuestionIndex - 1;
    if(questions[previousIndex]){
      setCurrentQuestionsIndex(previousIndex);
    }
  }, [currentQuestionIndex, questions]);

  const goToNextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    if(nextIndex < questions.length){
      setCurrentQuestionsIndex(nextIndex);
    } else {
      if(finished){
        goToResearch();
      }else {
        getNextQuestion();
      }
    }
  }, [currentQuestionIndex, questions, getNextQuestion, finished, goToResearch]);

  const setAnswer = useCallback((value) => {
    if(currentQuestion.resposta && questions[currentQuestionIndex]){
      goToNextQuestion();
    } else {
      const updatedQuestions = [...questions];
      if(updatedQuestions[currentQuestionIndex]){
        updatedQuestions[currentQuestionIndex].resposta = value;
        setQuestions(updatedQuestions);
        getNextQuestion(value);
      }
    }
  }, [currentQuestionIndex, questions, currentQuestion, getNextQuestion, goToNextQuestion]);

  const answerColor = useMemo(() => {
    if(currentQuestion){
      if(currentQuestion.resposta === 'SIM'){
        return styles.blue;
      }
      if(currentQuestion.resposta === 'TALVEZ'){
        return styles.yellow;
      }
      if(currentQuestion.resposta === 'NAO'){
        return styles.orange;
      } return '';
    }
    if(questions[currentQuestionIndex - 1]){
      if(questions[currentQuestionIndex - 1].resposta === 'SIM'){
        return styles.blue;
      }
      if(questions[currentQuestionIndex - 1].resposta === 'TALVEZ'){
        return styles.yellow;
      }
      if(questions[currentQuestionIndex - 1].resposta === 'NAO'){
        return styles.orange;
      } 
    }
    return '';
    
  }, [questions, currentQuestion, currentQuestionIndex]);

  return (
    <>
    {step === 'quiz' && (
      <main className={`${globalStyles.container} ${styles.quizWrapper} ${answerColor}`}>
        <Menu
          prevStep={'countdown'}
          text={(currentQuestionIndex + 1).toString()}
          prevAction={currentQuestionIndex ? goToPreviousQuestion : null}
          blackIcon={!!answerColor}
        />
        <QuestionList questions={questions} currentQuestion={currentQuestionIndex}/>
        <div className={styles.sidebar}>
          <Options
            options={[{label: 'Sim', value: 'SIM'},{label: 'Talvez', value: 'TALVEZ'}, {label: 'Não', value: 'NAO'}, ]}
            onSelect={currentQuestion ? setAnswer :  () => {}}
            selected={currentQuestion?.resposta}
          />
        </div>
        <LibrasToggle blackIcon={!!answerColor}/>
      </main>
    )}
    </>
  );
}

export default Quiz;