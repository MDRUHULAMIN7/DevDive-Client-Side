export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  typescript: "5.0.3",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const CODE_SNIPPETS = {
  javascript: `// Your First JavaScript Program\n\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Adnan");\n`,
  python: `#Your First Python programme\n\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  typescript: `// Your First TypeScript Program\n\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Adnan" });\n`,
  cpp: `// Your First C++ Program\n\n#include <iostream>\n\nint main() {\n std::cout << "Hello World!";\nreturn 0;\n}`,
  c: `// Your First C Program\n\n#include <stdio.h>\n\nint main() {\n printf("Hello World!");\n return 0;\n}`,
  java: `// Your First Java Program\n\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    `// Your First C# Program\n\nusing System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n`,
  php: `<?php\n\necho "Hello World!";\n\n?>\n`,
};

