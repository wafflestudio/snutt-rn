import { useState } from 'react';
import styled, { css } from 'styled-components';

import { LandingSignUp } from '@/pages/landing/landing-signup';
import { type AuthService } from '@/usecases/authService';
import { type FeedbackService } from '@/usecases/feedbackService';

import { LandingDescription } from './landing-description';
import { LandingLogin } from './landing-login';

export const Landing = ({
  authService,
  feedbackService,
}: {
  authService: AuthService;
  feedbackService: FeedbackService;
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');

  return (
    <Wrapper data-testid="landing">
      <Left feedbackService={feedbackService} />
      {
        {
          LOGIN: <Login authService={authService} onSignUp={() => setMode('SIGNUP')} />,
          SIGNUP: <SignUp authService={authService} />,
        }[mode]
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const Left = styled(LandingDescription)`
  flex: 1;
  overflow-y: auto;
`;

const rightStyle = css`
  width: 428px;
  background-color: #fafafa;
  border-left: 1px solid #efefef;
`;

const Login = styled(LandingLogin)`
  ${rightStyle}
`;

const SignUp = styled(LandingSignUp)`
  ${rightStyle}
`;
