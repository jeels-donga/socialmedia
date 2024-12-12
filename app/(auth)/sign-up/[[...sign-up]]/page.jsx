import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 px-4">
      <div className="relative max-w-md w-full p-8 rounded-xl overflow-hidden">
        <div className="absolute inset-0 rounded-xl"></div>
        <div className="relative z-10">
          <SignUp
            appearance={{
              baseTheme: dark,
              elements: {
                rootBox: " text-gray-200",
                headerTitle: "text-4xl font-extrabold text-white",
                headerSubtitle: "text-base text-gray-300 mt-2",
                formButtonPrimary:
                  "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105",
                formFieldInput:
                  "rounded-lg bg-gray-700 text-gray-200 border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none p-3",
                formFieldLabel: "text-gray-300 font-medium",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
