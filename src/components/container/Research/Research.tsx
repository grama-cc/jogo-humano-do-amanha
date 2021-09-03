import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import ResearchQuestion from 'components/view/ResearchQuestion/ResearchQuestion';
import ResearchOptions from 'components/container/ResearchOptions/ResearchOptions';

import SettingsContext from 'context/settingsContext';
import Menu from '../Menu/Menu';
import { Profile } from 'api';

import styles from 'globals.module.scss'
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import { ProfileQuestion } from 'types/types';

const MOCK = [ '20-40 anos', '40-60 anos']

const Research: React.FC = () => {
  const { step, setStep } = useContext(SettingsContext);
  const [questions, setQuestions] = useState<ProfileQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState<number>(0);
  const [gender,setGender] = useState<string>('');
  const [otherGender, setOtherGender] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');


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
          if(q.api_field === 'avaliacao_comentario'||
            q.api_field === 'personalizado_text' ||
            q.api_field === 'reflexao_texto'){
            return {
              ...q,
              options: [
                {
                  value: "",
                  text: "Responda aqui",
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

  const goToResult = useCallback(() => {
    setStep('result')
  }, [setStep]);


  const currentQuestion = useMemo(() => questions[currentQuestionIndex] || null, [currentQuestionIndex, questions]);

  const goToPreviousQuestion = useCallback(() => {
    const previousIndex = currentQuestionIndex - 1;
    if(questions[previousIndex]){
      setCurrentQuestionsIndex(previousIndex);
    } else {
      goToQuiz();
    }
  }, [currentQuestionIndex, questions]);

  const goToNextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    if(nextIndex < questions.length){
      setCurrentQuestionsIndex(nextIndex);
    } else {

      goToResult();
    }
  }, [currentQuestionIndex, questions]);

  const setAnswer = useCallback((value, textValue?) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answer = value;
    if(textValue){
      updatedQuestions[currentQuestionIndex].answerText = textValue;
    }

    setQuestions(updatedQuestions);
    goToNextQuestion();
  }, [currentQuestion, questions, goToNextQuestion]);

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
      <main className={styles.container}>
        <Menu text="Texto" prevStep={'quiz'} prevAction={currentQuestionIndex ? goToPreviousQuestion : null} />
        {!!questions.length ? (
          <>
            <ResearchQuestion question={currentQuestion} />
            <div className={styles.sidebar}>
              {!!currentQuestion.searchable && 
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.currentTarget.value)}
                  placeholder="Escreva aqui"
                />
              }
              <ResearchOptions options={questionOptions} onSelect={setAnswer} />
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