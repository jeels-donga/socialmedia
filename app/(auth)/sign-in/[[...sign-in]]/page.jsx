import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="w-full max-w-md p-6  rounded-lg ">
        <SignIn
          appearance={{
            baseTheme: dark,
            elements: {
              card: " shadow-md border border-gray-600",
              headerTitle: "text-white text-2xl font-bold",
              formFieldInput: "bg-gray-800 text-gray-300 border-gray-600 focus:ring-gray-500 focus:border-gray-500",
              formFieldLabel: "text-gray-400",
              button: "bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg px-4 py-2 transition",
            },
          }}
        />
      </div>
    </div>
  );
}
