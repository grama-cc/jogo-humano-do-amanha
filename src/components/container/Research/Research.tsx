import React, { useState, useEffect,useRef, useCallback, useContext, useMemo } from 'react';
import ResearchOptions from 'components/container/ResearchOptions/ResearchOptions';

import SettingsContext from 'context/settingsContext';
import Menu from '../Menu/Menu';
import QuestionList from 'components/container/QuestionList/QuestionList';
import { Profile } from 'api';

import styles from './Research.module.scss';
import globalStyles from 'globals.module.scss';

import LibrasToggle from '../LibrasToggle/LibrasToggle';
import { ProfileQuestion } from 'types/types';


const Research: React.FC = () => {
  const { step, setStep, userId } = useContext(SettingsContext);

  const [questions, setQuestions] = useState<ProfileQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const optionsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(questions.length && window.innerWidth < 770){
      if(optionsListRef.current){
        optionsListRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }
      setTimeout(() => {
        if(optionsListRef.current){
          optionsListRef.current.scrollTo({
            top: window.innerHeight/2,
            left: 0,
            behavior: 'smooth',
          })
        }
      }, 3000);
    }
  },[questions, currentQuestionIndex]);


  useEffect(() => {
    Profile.getQuestion().then(res => {
      const currentQuestions = res.questions
        .filter((q: any) => q.api_field !== 'outro_genero')
        .map((q: any) => {
          if(q.api_field === 'genero'){
            return {
              ...q,
              options: [
                ...q.options.filter((o: any) => o.value !== 'outro'),
                {
                  id: q.options.find((o: any) => o.value === 'outro').id,
                  value: "outro",
                  text: "Outro",
                  optionType: 'input',
                }
              ],
              answer: '',
              answerText: '',
            }
          } 
          if(q.api_field === 'onde_mora'){
            return {
              ...q,
              searchable: true,
              answer: '',

            }
          }
          if(q.api_field === 'avaliacao_jogo'){
            return {
              ...q,
              options: q.options.map((o: any) => ({...o, stars: true})),
              answer: '',
              answerText: '',
            }
          }
          if(q.api_field === 'data_aniversario'){
            return {
              ...q,
              options: [
                {
                  value: "",
                  optionType: 'date',
                }
              ],
              answer: '',
              answerText: '',
            }
          }
          if(q.api_field === 'avaliacao_comentario'||
            q.api_field === 'personalizado_text'){
            return {
              ...q,
              options: [
                {
                  value: "",
                  text: "Responda aqui...",
                  optionType: 'input',
                  canScape: true
                }
              ],
              answer: '',
              answerText: '',
            }
          }
          if(q.api_field === 'reflexao_texto'){
            return {
              ...q,
              options: [
                {
                  value: "",
                  text: "Responda aqui...",
                  optionType: 'input',
                }
              ],
              answer: '',
              answerText: '',
            }
          }
          if(q.api_field === 'melhoria'){
            return {
              ...q,
              options: [
                ...q.options.filter((o: any) => o.value !== 'outro' && o.value !== 'OTHER'),
                {
                  id: q.options?.find((o: any) => o.value === 'outro' || o.value === 'OTHER').id || '',
                  value: "OTHER",
                  text: "Outro",
                  optionType: 'input',
                }
              ],
              answer: '',
              answerText: '',
            }
          }
          return {
            ...q,
            answer: '',
            answerText: '',
          }
        });
      setQuestions(currentQuestions);
    });
  }, []);

  const goToQuiz = useCallback(() => {
    setStep('quiz')
  }, [setStep]);

  const goToAllHumans = useCallback(() => {
    setStep('allhumans')
  }, [setStep]);


  const currentQuestion = useMemo(() => questions[currentQuestionIndex] || null, [currentQuestionIndex, questions]);

  const goToPreviousQuestion = useCallback(() => {
    const previousIndex = currentQuestionIndex - 1;
    if(questions[previousIndex]){
      setCurrentQuestionsIndex(previousIndex);
    } else {
      goToQuiz();
    }
  }, [currentQuestionIndex, questions, goToQuiz]);

  const formatDate = (date) => {
    let finalDate = '';
    const splitedDate = date.split(' / ');
    finalDate = `${splitedDate[2]}-${splitedDate[1]}-${splitedDate[0]}`;
    return finalDate;
  };

  const sendAnswers = useCallback(() => {
    Profile.postAnswers({
      genero: questions.find(q => q.api_field === 'genero')?.answer || 'outro', 
      outro_genero: questions.find(q => q.api_field === 'genero')?.answerText || '',
      data_aniversario: formatDate(questions.find(q => q.api_field === 'data_aniversario')?.answerText),
      onde_mora: questions.find(q => q.api_field === 'onde_mora')?.answer || '',
      avaliacao_jogo: parseInt((questions.find(q => q.api_field === 'avaliacao_jogo')?.answer || ''), 10) || 0,
      avaliacao_comentario: questions.find(q => q.api_field === 'avaliacao_comentario')?.answer || '',
      melhoria: questions.find(q => q.api_field === 'melhoria')?.answer || '',
      personalizado: questions.find(q => q.api_field === 'personalizado')?.answer || '',
      personalizado_text: questions.find(q => q.api_field === 'personalizado_text')?.answerText || '',
      personalizado_options: questions.find(q => q.api_field === 'personalizado_options')?.answer || '',
      // resultado_identificacao: questions.find(q => q.api_field === 'resultado_identificacao')?.answer || '',
      jogo_sensibilizou: questions.find(q => q.api_field === 'jogo_sensibilizou')?.answer || '',
      reflexao_texto: questions.find(q => q.api_field === 'reflexao_texto')?.answerText || '',
      recomendar: parseInt(questions.find(q => q.api_field === 'recomendar')?.answer || '', 10) || 0 ,
      resposta: userId || ''
    });
  },[questions, userId]);

  const goToNextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    if(nextIndex < questions.length){
      setCurrentQuestionsIndex(nextIndex);
    } else {
      sendAnswers();
      goToAllHumans();
    }
  }, [currentQuestionIndex, questions, goToAllHumans, sendAnswers]);

  const setAnswer = useCallback((value, textValue?) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answer = value;
    if(textValue){
      updatedQuestions[currentQuestionIndex].answerText = textValue;
    }

    setQuestions(updatedQuestions);
    goToNextQuestion();
  }, [questions, goToNextQuestion, currentQuestionIndex]);

  const questionOptions = useMemo(() => {
    if(currentQuestion){
      if(currentQuestion.searchable){
        return currentQuestion.options.filter(opt => opt.text.toLowerCase().includes(searchQuery.toLowerCase()));
      } return currentQuestion.options;
    } return [];
  }, [searchQuery, currentQuestion]);

  return (
    <>
    {step === 'research' && (
      <main className={`${globalStyles.container} ${styles.researchWrapper}`}>
        <Menu text={(currentQuestionIndex + 1).toString()} prevStep={'result'} prevAction={currentQuestionIndex ? goToPreviousQuestion : undefined} />
        {!!questions.length ? (
          <>
            <QuestionList questions={questions} currentQuestion={currentQuestionIndex}/>
            <div ref={optionsListRef} className={styles.sidebar}>
              {!!currentQuestion.searchable && 
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.currentTarget.value)}
                  placeholder="Escreva aqui"
                  className={styles.filterInput}
                />
              }
              <ResearchOptions
                searchable={!!currentQuestion.searchable}
                options={questionOptions}
                onSelect={setAnswer} 
                selected={currentQuestion.answerText || currentQuestion.answer || currentQuestion.resposta || ''}
              />
              <div>
              </div>
            </div>
          </>
        ): 'Carregando...'}
        <LibrasToggle />
      </main>
    )}
    </>
  );
}

export default Research;