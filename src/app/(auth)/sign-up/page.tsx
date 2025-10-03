import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center pt-32 pb-20">
      <SignUp
        routing="hash"
        afterSignUpUrl="/"
        redirectUrl="/"
        appearance={{ layout: { socialButtonsVariant: 'blockButton' } }}
      />
    </div>
  );
}
