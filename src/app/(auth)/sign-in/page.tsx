import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center pt-32 pb-20">
      <SignIn
        routing="hash"
        afterSignInUrl="/"
        redirectUrl="/"
        appearance={{ layout: { socialButtonsVariant: 'blockButton' } }}
      />
    </div>
  );
}
