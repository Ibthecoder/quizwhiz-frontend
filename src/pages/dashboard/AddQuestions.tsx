import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Badge } from '@/common/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, ArrowLeft, CheckCircle } from 'lucide-react';

interface QuestionFormData {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  correctAnswerIndex: number;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

// Mock data
const mockQuiz: Quiz = {
  id: 'abc123',
  title: 'JavaScript Fundamentals',
  questions: [
    {
      id: '1',
      question: 'What is the difference between let and var in JavaScript?',
      options: [
        'Block scope vs function scope',
        'No difference',
        'let is older',
        'var is deprecated',
      ],
      correctAnswerIndex: 0,
    },
    {
      id: '2',
      question: 'Which method is used to add an element to the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correctAnswerIndex: 0,
    },
    {
      id: '3',
      question: 'What does the "this" keyword refer to in JavaScript?',
      options: [
        'The current function',
        'The global object',
        'The current object context',
        'The parent object',
      ],
      correctAnswerIndex: 2,
    },
  ],
};

const AddQuestion = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [optionCount, setOptionCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(mockQuiz.questions);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<QuestionFormData>({
    defaultValues: {
      correctAnswerIndex: 0,
    },
  });

  const onSubmit = async (data: QuestionFormData) => {
    // Mock validation
    const filledOptions = [data.option1, data.option2, data.option3, data.option4, data.option5]
      .filter((option) => option?.trim() !== '')
      .slice(0, optionCount);

    if (filledOptions.length < 2) {
      toast({
        title: 'Validation Error',
        description: 'Please fill at least 2 options',
        variant: 'destructive',
      });
      return;
    }

    if (data.correctAnswerIndex >= filledOptions.length) {
      toast({
        title: 'Validation Error',
        description: 'Please select a valid correct answer',
        variant: 'destructive',
      });
      return;
    }

    // Mock submission with loading state
    setIsLoading(true);
    console.log('Submitting question:', {
      question: data.question,
      options: filledOptions,
      correctAnswerIndex: data.correctAnswerIndex,
    });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock success response
    const newQuestion: Question = {
      id: `mock-${Date.now()}`,
      question: data.question,
      options: filledOptions,
      correctAnswerIndex: data.correctAnswerIndex,
    };

    setQuestions((prev) => [...prev, newQuestion]);

    toast({
      title: 'Success',
      description: `✅ Question added successfully (${questions.length + 1} total)`,
    });

    reset();
    setIsLoading(false);
  };

  const addOption = () => {
    if (optionCount < 5) {
      setOptionCount(optionCount + 1);
    }
  };

  const removeOption = () => {
    if (optionCount > 2) {
      setOptionCount(optionCount - 1);
    }
  };

  const watchedValues = watch();

  return (
    <div className='container mx-auto p-6 max-w-4xl'>
      {/* Header */}
      <div className='mb-6'>
        <Button variant='ghost' onClick={() => navigate('/dashboard')} className='mb-4'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Dashboard
        </Button>
        <div className='flex items-center gap-3 mb-2'>
          <h1 className='text-3xl font-bold'>Add Questions</h1>
          <Badge variant='secondary'>{questions.length} questions</Badge>
        </div>
        <p className='text-muted-foreground'>
          Adding questions to: <span className='font-medium'>{mockQuiz.title}</span>
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Question Form */}
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Add New Question</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                {/* Question Input */}
                <div>
                  <Label htmlFor='question'>Question</Label>
                  <Input
                    id='question'
                    {...register('question', { required: 'Question is required' })}
                    placeholder='Enter your question...'
                    className='mt-1'
                  />
                  {errors.question && (
                    <p className='text-sm text-destructive mt-1'>{errors.question.message}</p>
                  )}
                </div>

                {/* Options */}
                <div>
                  <div className='flex items-center justify-between mb-3'>
                    <Label>Options</Label>
                    <div className='flex gap-2'>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={removeOption}
                        disabled={optionCount <= 2}
                      >
                        <Trash2 className='w-4 h-4' />
                      </Button>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={addOption}
                        disabled={optionCount >= 5}
                      >
                        <Plus className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>

                  {Array.from({ length: optionCount }, (_, index) => (
                    <div key={index} className='flex items-center gap-3 mb-3'>
                      <div className='flex-1'>
                        <Input
                          {...register(`option${index + 1}` as keyof QuestionFormData, {
                            required: index < 2 ? 'This option is required' : false,
                          })}
                          placeholder={`Option ${index + 1}`}
                        />
                        {errors[`option${index + 1}` as keyof QuestionFormData] && (
                          <p className='text-sm text-destructive mt-1'>
                            {errors[`option${index + 1}` as keyof QuestionFormData]?.message}
                          </p>
                        )}
                      </div>
                      <input
                        type='radio'
                        {...register('correctAnswerIndex', { required: true })}
                        value={index}
                        className='text-primary'
                        title='Mark as correct answer'
                      />
                      {watchedValues.correctAnswerIndex === index && (
                        <CheckCircle className='w-5 h-5 text-green-600' />
                      )}
                    </div>
                  ))}
                  <p className='text-sm text-muted-foreground'>
                    Select the radio button next to the correct answer
                  </p>
                </div>

                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? 'Adding Question...' : 'Add Question'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Previously Added Questions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Questions Added ({questions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {questions.length === 0 ? (
                <p className='text-muted-foreground text-center py-4'>No questions added yet</p>
              ) : (
                <div className='space-y-3'>
                  {questions.map((q, index) => (
                    <div key={q.id} className='p-3 border rounded-md'>
                      <p className='font-medium text-sm mb-2'>
                        {index + 1}.{' '}
                        {q.question.length > 50 ? `${q.question.substring(0, 50)}...` : q.question}
                      </p>
                      <div className='space-y-1'>
                        {q.options.map((option, optIndex) => (
                          <p
                            key={optIndex}
                            className={`text-xs ${optIndex === q.correctAnswerIndex ? 'text-green-600 font-medium' : 'text-muted-foreground'}`}
                          >
                            {optIndex === q.correctAnswerIndex ? '✓ ' : '• '}
                            {option}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
