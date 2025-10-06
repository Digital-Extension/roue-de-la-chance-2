
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Award, RotateCw } from "lucide-react";
import { cn } from '@/lib/utils';
import ConfettiExplosion from './confetti-explosion';

interface QuizSectionProps {
  t: any;
}

export default function QuizSection({ t }: QuizSectionProps) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(t.quizQuestions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const questions = t.quizQuestions;

  const handleAnswerSelection = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[activeQuestion] = answer;
    setSelectedAnswers(newAnswers);

    // Automatically move to the next question after a short delay
    setTimeout(() => {
      if (activeQuestion < questions.length - 1) {
        setActiveQuestion(activeQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 500);
  };

  const restartQuiz = () => {
    setActiveQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(null));
    setShowResults(false);
  };
  
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
        return answer === questions[index].answer ? score + 1 : score;
    }, 0);
  };

  const getCongratsMessage = (score: number) => {
    let index = Math.floor(score * (t.quizCongrats.length -1) / questions.length)
    if(score === questions.length) index = t.quizCongrats.length -1
    return t.quizCongrats[index];
  }

  const score = calculateScore();

  return (
    <section className="w-full max-w-5xl mx-auto p-4 lg:p-8">
      <Card className="bg-card text-card-foreground rounded-lg border shadow-lg overflow-hidden">
        <CardHeader className="bg-muted/50 p-6">
          <CardTitle className="text-3xl font-bold text-foreground/90 font-headline tracking-wider text-center">{t.quizTitle}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground text-center mt-1">{t.quizDescription}</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          {!showResults ? (
            <div>
              <div className="mb-4 text-center text-sm text-muted-foreground">
                Question {activeQuestion + 1} / {questions.length}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-center mb-8">{questions[activeQuestion].q}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[activeQuestion].options.map((option: string, index: number) => {
                  const isSelected = selectedAnswers[activeQuestion] === option;
                  const isCorrect = questions[activeQuestion].answer === option;
                  
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      className={cn(
                        "justify-start text-left h-auto py-4 text-base",
                        isSelected && !showResults && "bg-primary/20 border-primary",
                        isSelected && showResults && isCorrect && "bg-green-100 border-green-500 text-green-800 hover:bg-green-200",
                        isSelected && showResults && !isCorrect && "bg-red-100 border-red-500 text-red-800 hover:bg-red-200"
                      )}
                      onClick={() => handleAnswerSelection(option)}
                      disabled={selectedAnswers[activeQuestion] !== null}
                    >
                      <span className={cn("mr-3 h-5 w-5 rounded-full border flex items-center justify-center", isSelected ? 'border-primary' : 'border-muted-foreground')}>
                        {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                      </span>
                      {option}
                    </Button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="text-center relative">
              {score === questions.length && <ConfettiExplosion />}
              <div className="flex justify-center mb-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                      <Award className="h-12 w-12 text-primary" />
                  </div>
              </div>
              <h3 className="text-3xl font-bold font-headline mb-4">{t.quizResultTitle}</h3>
              <p className="text-4xl font-bold text-primary my-4">
                {t.quizScore.replace('{score}', score).replace('{total}', questions.length)}
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                {getCongratsMessage(score)}
              </p>
              <Button onClick={restartQuiz} size="lg">
                <RotateCw className="mr-2 h-5 w-5" />
                {t.quizRestart}
              </Button>
            </div>
          )}
        </CardContent>
        {!showResults && (
            <CardFooter className="p-4 bg-muted/30">
                 <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-primary rounded-full transition-all duration-300" 
                        style={{ width: `${((activeQuestion + (selectedAnswers[activeQuestion] ? 1: 0)) / questions.length) * 100}%` }}
                    />
                </div>
            </CardFooter>
        )}
      </Card>
    </section>
  );
}
