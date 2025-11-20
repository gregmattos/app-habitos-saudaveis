'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { saveUserProfile } from '@/lib/storage';
import type { UserProfile, QuizAnswer } from '@/lib/types';
import { Sparkles, Target, Heart, Zap } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [behaviorProfile, setBehaviorProfile] = useState('');

  const goals = [
    'Beber mais água',
    'Alimentação saudável',
    'Exercícios regulares',
    'Perder peso',
    'Ganhar massa muscular',
    'Mais energia',
    'Melhorar sono',
    'Reduzir estresse',
  ];

  const painPoints = [
    'Esqueço de beber água',
    'Não tenho tempo para exercícios',
    'Dificuldade em manter constância',
    'Não sei o que comer',
    'Falta de motivação',
    'Cansaço constante',
    'Ansiedade',
    'Desorganização',
  ];

  const behaviorProfiles = [
    { value: 'beginner', label: 'Iniciante', description: 'Começando agora minha jornada' },
    { value: 'intermediate', label: 'Intermediária', description: 'Já tenho alguns hábitos' },
    { value: 'advanced', label: 'Avançada', description: 'Busco otimizar minha rotina' },
  ];

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handlePainToggle = (pain: string) => {
    setSelectedPains(prev =>
      prev.includes(pain) ? prev.filter(p => p !== pain) : [...prev, pain]
    );
  };

  const handleComplete = () => {
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name,
      age: parseInt(age),
      goals: selectedGoals,
      painPoints: selectedPains,
      behaviorProfile,
      createdAt: new Date().toISOString(),
      onboardingCompleted: true,
    };

    saveUserProfile(profile);
    router.push('/');
  };

  const steps = [
    // Step 0: Boas-vindas
    <div key="welcome" className="text-center space-y-6">
      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        Bem-vinda ao Verão Ativo! ☀️
      </h1>
      <p className="text-lg text-gray-600">
        Vamos criar seu perfil personalizado para tornar seus hábitos saudáveis uma realidade
      </p>
      <Button
        onClick={() => setStep(1)}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
        size="lg"
      >
        Começar
      </Button>
    </div>,

    // Step 1: Nome e Idade
    <div key="basic-info" className="space-y-6">
      <div className="text-center">
        <Heart className="w-12 h-12 mx-auto text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Vamos nos conhecer!</h2>
        <p className="text-gray-600 mt-2">Como podemos te chamar?</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Seu nome</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="age">Sua idade</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Digite sua idade"
            className="mt-1"
          />
        </div>
      </div>
      <Button
        onClick={() => setStep(2)}
        disabled={!name || !age}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
        size="lg"
      >
        Continuar
      </Button>
    </div>,

    // Step 2: Objetivos
    <div key="goals" className="space-y-6">
      <div className="text-center">
        <Target className="w-12 h-12 mx-auto text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Quais são seus objetivos?</h2>
        <p className="text-gray-600 mt-2">Selecione todos que se aplicam</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {goals.map((goal) => (
          <Card
            key={goal}
            className={`p-4 cursor-pointer transition-all ${
              selectedGoals.includes(goal)
                ? 'bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-400'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleGoalToggle(goal)}
          >
            <div className="flex items-center space-x-2">
              <Checkbox checked={selectedGoals.includes(goal)} />
              <span className="text-sm font-medium">{goal}</span>
            </div>
          </Card>
        ))}
      </div>
      <Button
        onClick={() => setStep(3)}
        disabled={selectedGoals.length === 0}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
        size="lg"
      >
        Continuar
      </Button>
    </div>,

    // Step 3: Dores
    <div key="pains" className="space-y-6">
      <div className="text-center">
        <Zap className="w-12 h-12 mx-auto text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Quais são seus desafios?</h2>
        <p className="text-gray-600 mt-2">Vamos te ajudar a superá-los</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {painPoints.map((pain) => (
          <Card
            key={pain}
            className={`p-4 cursor-pointer transition-all ${
              selectedPains.includes(pain)
                ? 'bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-400'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handlePainToggle(pain)}
          >
            <div className="flex items-center space-x-2">
              <Checkbox checked={selectedPains.includes(pain)} />
              <span className="text-sm font-medium">{pain}</span>
            </div>
          </Card>
        ))}
      </div>
      <Button
        onClick={() => setStep(4)}
        disabled={selectedPains.length === 0}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
        size="lg"
      >
        Continuar
      </Button>
    </div>,

    // Step 4: Perfil Comportamental
    <div key="behavior" className="space-y-6">
      <div className="text-center">
        <Sparkles className="w-12 h-12 mx-auto text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Como você se define?</h2>
        <p className="text-gray-600 mt-2">Isso nos ajuda a personalizar sua experiência</p>
      </div>
      <RadioGroup value={behaviorProfile} onValueChange={setBehaviorProfile}>
        <div className="space-y-3">
          {behaviorProfiles.map((profile) => (
            <Card
              key={profile.value}
              className={`p-4 cursor-pointer transition-all ${
                behaviorProfile === profile.value
                  ? 'bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-400'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setBehaviorProfile(profile.value)}
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={profile.value} id={profile.value} />
                <div className="flex-1">
                  <Label htmlFor={profile.value} className="font-semibold cursor-pointer">
                    {profile.label}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{profile.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </RadioGroup>
      <Button
        onClick={handleComplete}
        disabled={!behaviorProfile}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
        size="lg"
      >
        Finalizar
      </Button>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 shadow-xl">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Passo {step + 1} de 5</span>
            <span className="text-sm font-medium text-orange-600">{Math.round(((step + 1) / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / 5) * 100}%` }}
            />
          </div>
        </div>

        {steps[step]}
      </Card>
    </div>
  );
}
