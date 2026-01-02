// Learning path data with Python lessons
export interface Lesson {
  id: string;
  title: string;
  description: string;
  xp: number;
  type: 'lesson' | 'practice' | 'challenge';
  questions: Question[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'predict-output' | 'bug-fix';
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  xp: number;
}

export interface SkillNode {
  id: string;
  name: string;
  icon: string;
  description: string;
  level: number;
  maxLevel: number;
  xpRequired: number;
  xpEarned: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  lessons: Lesson[];
  position: { x: number; y: number };
  connections: string[];
}

export interface UserProgress {
  totalXp: number;
  level: number;
  streak: number;
  hearts: number;
  maxHearts: number;
  completedLessons: string[];
  currentLesson: string | null;
  badges: Badge[];
  skillProgress: Record<string, number>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
  requirement: string;
}

// Initial user progress
export const initialUserProgress: UserProgress = {
  totalXp: 250,
  level: 3,
  streak: 5,
  hearts: 5,
  maxHearts: 5,
  completedLessons: ['variables-1', 'variables-2'],
  currentLesson: 'variables-3',
  badges: [
    { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earnedAt: new Date(), requirement: 'Complete 1 lesson' },
    { id: 'streak-3', name: 'On Fire!', description: 'Maintain a 3-day streak', icon: '🔥', earnedAt: new Date(), requirement: '3-day streak' },
  ],
  skillProgress: {
    'variables': 60,
    'conditions': 0,
    'loops': 0,
    'functions': 0,
    'arrays': 0,
  },
};

// Sample badges
export const allBadges: Badge[] = [
  { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', requirement: 'Complete 1 lesson' },
  { id: 'streak-3', name: 'On Fire!', description: 'Maintain a 3-day streak', icon: '🔥', requirement: '3-day streak' },
  { id: 'streak-7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '⚡', requirement: '7-day streak' },
  { id: 'streak-30', name: 'Legendary', description: 'Maintain a 30-day streak', icon: '👑', requirement: '30-day streak' },
  { id: 'perfect-lesson', name: 'Perfect!', description: 'Complete a lesson without mistakes', icon: '💎', requirement: 'No mistakes in a lesson' },
  { id: 'xp-100', name: 'Rising Star', description: 'Earn 100 XP', icon: '⭐', requirement: 'Earn 100 XP' },
  { id: 'xp-500', name: 'Dedicated', description: 'Earn 500 XP', icon: '🌟', requirement: 'Earn 500 XP' },
  { id: 'xp-1000', name: 'Code Master', description: 'Earn 1000 XP', icon: '🏆', requirement: 'Earn 1000 XP' },
  { id: 'skill-complete', name: 'Skill Master', description: 'Complete all lessons in a skill', icon: '🎓', requirement: 'Max out a skill' },
  { id: 'bug-hunter', name: 'Bug Hunter', description: 'Fix 10 bugs', icon: '🐛', requirement: 'Fix 10 bugs' },
];

// Skill tree data
export const skillTree: SkillNode[] = [
  {
    id: 'variables',
    name: 'Variables',
    icon: '📦',
    description: 'Learn to store and use data',
    level: 2,
    maxLevel: 5,
    xpRequired: 500,
    xpEarned: 250,
    status: 'in-progress',
    position: { x: 50, y: 0 },
    connections: ['conditions'],
    lessons: [
      {
        id: 'variables-1',
        title: 'What are Variables?',
        description: 'Learn the basics of storing data',
        xp: 50,
        type: 'lesson',
        questions: [
          {
            id: 'v1-q1',
            type: 'multiple-choice',
            question: 'What is a variable in Python?',
            options: [
              'A container that stores data',
              'A type of loop',
              'A mathematical equation',
              'A Python function'
            ],
            correctAnswer: 0,
            explanation: 'A variable is like a labeled box that stores data. You can put values in it and use them later!',
            xp: 10,
          },
          {
            id: 'v1-q2',
            type: 'fill-blank',
            question: 'Complete the code to store the number 42 in a variable called "answer":',
            code: '_____ = 42',
            correctAnswer: 'answer',
            explanation: 'In Python, we create variables by writing the name, then =, then the value.',
            xp: 15,
          },
          {
            id: 'v1-q3',
            type: 'predict-output',
            question: 'What will this code print?',
            code: 'name = "Python"\nprint(name)',
            options: ['name', 'Python', '"Python"', 'Error'],
            correctAnswer: 1,
            explanation: 'The variable "name" contains the text "Python", so print(name) displays Python.',
            xp: 15,
          },
        ],
      },
      {
        id: 'variables-2',
        title: 'Naming Variables',
        description: 'Best practices for variable names',
        xp: 50,
        type: 'lesson',
        questions: [
          {
            id: 'v2-q1',
            type: 'multiple-choice',
            question: 'Which is a valid Python variable name?',
            options: ['my_name', '2cool', 'my-var', 'class'],
            correctAnswer: 0,
            explanation: 'Variable names can contain letters, numbers, and underscores, but cannot start with a number or use reserved words like "class".',
            xp: 10,
          },
          {
            id: 'v2-q2',
            type: 'bug-fix',
            question: 'Fix the bug in this code:',
            code: '1st_place = "Gold"\nprint(1st_place)',
            options: [
              'first_place = "Gold"',
              '_1st_place = "Gold"',
              'Both A and B would work',
              'The code is correct'
            ],
            correctAnswer: 2,
            explanation: 'Variable names cannot start with a number. Both "first_place" and "_1st_place" are valid alternatives!',
            xp: 20,
          },
        ],
      },
      {
        id: 'variables-3',
        title: 'Variable Types',
        description: 'Numbers, text, and more!',
        xp: 60,
        type: 'lesson',
        questions: [
          {
            id: 'v3-q1',
            type: 'multiple-choice',
            question: 'What type of data is stored in: age = 25',
            options: ['String (text)', 'Integer (whole number)', 'Float (decimal)', 'Boolean'],
            correctAnswer: 1,
            explanation: '25 is a whole number without quotes, so it\'s an integer!',
            xp: 10,
          },
          {
            id: 'v3-q2',
            type: 'predict-output',
            question: 'What will this code print?',
            code: 'x = 10\ny = 3\nprint(x + y)',
            options: ['103', '13', 'xy', 'Error'],
            correctAnswer: 1,
            explanation: 'When adding two numbers, Python performs arithmetic. 10 + 3 = 13',
            xp: 15,
          },
          {
            id: 'v3-q3',
            type: 'fill-blank',
            question: 'Complete the code to create a decimal number:',
            code: 'price = _____',
            correctAnswer: '19.99',
            explanation: 'Decimal numbers (floats) use a dot to separate whole and decimal parts.',
            xp: 15,
          },
          {
            id: 'v3-q4',
            type: 'bug-fix',
            question: 'This code should print "Hello World" but has a bug. What\'s wrong?',
            code: 'greeting = Hello World\nprint(greeting)',
            options: [
              'Add quotes: greeting = "Hello World"',
              'Change print to Print',
              'Remove the space',
              'Nothing is wrong'
            ],
            correctAnswer: 0,
            explanation: 'Text (strings) must be wrapped in quotes. Without quotes, Python thinks Hello and World are variable names!',
            xp: 20,
          },
        ],
      },
    ],
  },
  {
    id: 'conditions',
    name: 'Conditions',
    icon: '🔀',
    description: 'Make decisions in your code',
    level: 0,
    maxLevel: 5,
    xpRequired: 600,
    xpEarned: 0,
    status: 'available',
    position: { x: 50, y: 1 },
    connections: ['loops'],
    lessons: [
      {
        id: 'conditions-1',
        title: 'If Statements',
        description: 'Your first decisions',
        xp: 60,
        type: 'lesson',
        questions: [
          {
            id: 'c1-q1',
            type: 'multiple-choice',
            question: 'What does an if statement do?',
            options: [
              'Runs code only when a condition is true',
              'Repeats code multiple times',
              'Stores data in a variable',
              'Prints text to the screen'
            ],
            correctAnswer: 0,
            explanation: 'If statements check a condition and only run their code block when it\'s True!',
            xp: 10,
          },
        ],
      },
    ],
  },
  {
    id: 'loops',
    name: 'Loops',
    icon: '🔄',
    description: 'Repeat actions automatically',
    level: 0,
    maxLevel: 5,
    xpRequired: 700,
    xpEarned: 0,
    status: 'locked',
    position: { x: 50, y: 2 },
    connections: ['functions'],
    lessons: [
      {
        id: 'loops-1',
        title: 'While Loops',
        description: 'Repeat while a condition is true',
        xp: 60,
        type: 'lesson',
        questions: [
          {
            id: 'l1-q1',
            type: 'multiple-choice',
            question: 'What does a while loop do?',
            options: [
              'Repeats code while a condition is True',
              'Runs code only once',
              'Creates a variable',
              'Defines a function'
            ],
            correctAnswer: 0,
            explanation: 'A while loop keeps running its code block as long as its condition remains True!',
            xp: 10,
          },
          {
            id: 'l1-q2',
            type: 'predict-output',
            question: 'What will this code print?',
            code: 'count = 0\nwhile count < 3:\n    print(count)\n    count += 1',
            options: ['0 1 2', '1 2 3', '0 1 2 3', 'Infinite loop'],
            correctAnswer: 0,
            explanation: 'The loop prints 0, 1, 2 and stops when count becomes 3 (no longer < 3).',
            xp: 15,
          },
          {
            id: 'l1-q3',
            type: 'fill-blank',
            question: 'Complete the loop to count from 1 to 5:',
            code: 'num = 1\nwhile num _____ 5:\n    print(num)\n    num += 1',
            correctAnswer: '<=',
            explanation: 'Using <= makes the loop include 5. Using < would stop at 4.',
            xp: 15,
          },
          {
            id: 'l1-q4',
            type: 'bug-fix',
            question: 'This loop never stops! Find the bug:',
            code: 'x = 5\nwhile x > 0:\n    print(x)',
            options: [
              'Add x -= 1 inside the loop',
              'Change > to <',
              'Remove the print statement',
              'The code is correct'
            ],
            correctAnswer: 0,
            explanation: 'Without decreasing x, the condition x > 0 stays True forever. Add x -= 1 to count down!',
            xp: 20,
          },
        ],
      },
      {
        id: 'loops-2',
        title: 'For Loops',
        description: 'Loop through sequences',
        xp: 65,
        type: 'lesson',
        questions: [
          {
            id: 'l2-q1',
            type: 'multiple-choice',
            question: 'What is the main purpose of a for loop?',
            options: [
              'To iterate through a sequence of items',
              'To check if something is true',
              'To create variables',
              'To define functions'
            ],
            correctAnswer: 0,
            explanation: 'For loops are perfect for going through lists, strings, or ranges one item at a time!',
            xp: 10,
          },
          {
            id: 'l2-q2',
            type: 'predict-output',
            question: 'What will this code print?',
            code: 'for i in range(3):\n    print(i)',
            options: ['1 2 3', '0 1 2', '0 1 2 3', '1 2'],
            correctAnswer: 1,
            explanation: 'range(3) generates 0, 1, 2. Python ranges start at 0 by default!',
            xp: 15,
          },
          {
            id: 'l2-q3',
            type: 'predict-output',
            question: 'What will this code print?',
            code: 'word = "Hi"\nfor letter in word:\n    print(letter)',
            options: ['Hi', 'H i', 'H\\ni', 'word'],
            correctAnswer: 2,
            explanation: 'The for loop iterates through each character, printing H then i on separate lines.',
            xp: 15,
          },
          {
            id: 'l2-q4',
            type: 'fill-blank',
            question: 'Complete the code to print numbers 1 to 5:',
            code: 'for num in range(_____):\n    print(num)',
            correctAnswer: '1, 6',
            explanation: 'range(1, 6) starts at 1 and goes up to (but not including) 6, giving us 1, 2, 3, 4, 5.',
            xp: 20,
          },
        ],
      },
      {
        id: 'loops-3',
        title: 'Loop Practice',
        description: 'Test your loop skills',
        xp: 70,
        type: 'practice',
        questions: [
          {
            id: 'l3-q1',
            type: 'predict-output',
            question: 'What is the sum at the end?',
            code: 'sum = 0\nfor i in range(1, 4):\n    sum += i\nprint(sum)',
            options: ['6', '10', '3', '4'],
            correctAnswer: 0,
            explanation: 'sum = 0 + 1 + 2 + 3 = 6. The range(1, 4) gives us 1, 2, 3.',
            xp: 15,
          },
          {
            id: 'l3-q2',
            type: 'bug-fix',
            question: 'This should print each fruit, but there\'s an error:',
            code: 'fruits = ["apple", "banana"]\nfor fruit in Fruits:\n    print(fruit)',
            options: [
              'Change Fruits to fruits (lowercase)',
              'Add quotes around fruits',
              'Remove the colon',
              'The code is correct'
            ],
            correctAnswer: 0,
            explanation: 'Python is case-sensitive! The list is called fruits, not Fruits.',
            xp: 20,
          },
          {
            id: 'l3-q3',
            type: 'multiple-choice',
            question: 'What does "break" do in a loop?',
            options: [
              'Exits the loop immediately',
              'Pauses the loop',
              'Skips to the next iteration',
              'Restarts the loop'
            ],
            correctAnswer: 0,
            explanation: 'break stops the loop completely and continues with code after the loop.',
            xp: 15,
          },
          {
            id: 'l3-q4',
            type: 'multiple-choice',
            question: 'What does "continue" do in a loop?',
            options: [
              'Exits the loop',
              'Skips to the next iteration',
              'Pauses the loop',
              'Ends the program'
            ],
            correctAnswer: 1,
            explanation: 'continue skips the rest of the current iteration and moves to the next one.',
            xp: 15,
          },
        ],
      },
    ],
  },
  {
    id: 'functions',
    name: 'Functions',
    icon: '⚙️',
    description: 'Create reusable code blocks',
    level: 0,
    maxLevel: 5,
    xpRequired: 800,
    xpEarned: 0,
    status: 'locked',
    position: { x: 50, y: 3 },
    connections: ['arrays'],
    lessons: [
      {
        id: 'functions-1',
        title: 'Defining Functions',
        description: 'Create your own functions',
        xp: 70,
        type: 'lesson',
        questions: [
          {
            id: 'f1-q1',
            type: 'multiple-choice',
            question: 'What keyword is used to create a function in Python?',
            options: ['def', 'function', 'func', 'create'],
            correctAnswer: 0,
            explanation: 'In Python, we use "def" (short for define) to create functions!',
            xp: 10,
          },
          {
            id: 'f1-q2',
            type: 'fill-blank',
            question: 'Complete the function definition:',
            code: '_____ greet():\n    print("Hello!")',
            correctAnswer: 'def',
            explanation: 'Functions start with "def", followed by the name and parentheses.',
            xp: 15,
          },
          {
            id: 'f1-q3',
            type: 'predict-output',
            question: 'What happens when this code runs?',
            code: 'def say_hi():\n    print("Hi!")\n\nprint("Start")',
            options: ['Start', 'Hi!\\nStart', 'Start\\nHi!', 'Nothing'],
            correctAnswer: 0,
            explanation: 'The function is defined but never called! Only "Start" is printed.',
            xp: 15,
          },
          {
            id: 'f1-q4',
            type: 'predict-output',
            question: 'Now what will this print?',
            code: 'def say_hi():\n    print("Hi!")\n\nsay_hi()',
            options: ['Hi!', 'say_hi', 'Nothing', 'Error'],
            correctAnswer: 0,
            explanation: 'Now we call the function with say_hi(), so it prints "Hi!"',
            xp: 15,
          },
        ],
      },
      {
        id: 'functions-2',
        title: 'Parameters & Arguments',
        description: 'Pass data to functions',
        xp: 75,
        type: 'lesson',
        questions: [
          {
            id: 'f2-q1',
            type: 'multiple-choice',
            question: 'What is a parameter?',
            options: [
              'A variable that receives data when a function is called',
              'A type of loop',
              'A way to exit a function',
              'A Python keyword'
            ],
            correctAnswer: 0,
            explanation: 'Parameters are placeholders in the function definition that receive values when called.',
            xp: 10,
          },
          {
            id: 'f2-q2',
            type: 'predict-output',
            question: 'What will this print?',
            code: 'def greet(name):\n    print("Hello, " + name)\n\ngreet("Alex")',
            options: ['Hello, name', 'Hello, Alex', 'Alex', 'Error'],
            correctAnswer: 1,
            explanation: 'The argument "Alex" is passed to the parameter "name", printing "Hello, Alex".',
            xp: 15,
          },
          {
            id: 'f2-q3',
            type: 'fill-blank',
            question: 'Complete the function call:',
            code: 'def double(x):\n    print(x * 2)\n\ndouble(_____)',
            correctAnswer: '5',
            explanation: 'We pass 5 as an argument, and the function prints 10 (5 * 2).',
            xp: 15,
          },
          {
            id: 'f2-q4',
            type: 'predict-output',
            question: 'What will this print?',
            code: 'def add(a, b):\n    print(a + b)\n\nadd(3, 7)',
            options: ['3', '7', '10', 'a + b'],
            correctAnswer: 2,
            explanation: 'The function receives 3 and 7, adds them, and prints 10.',
            xp: 20,
          },
        ],
      },
      {
        id: 'functions-3',
        title: 'Return Values',
        description: 'Get data back from functions',
        xp: 80,
        type: 'lesson',
        questions: [
          {
            id: 'f3-q1',
            type: 'multiple-choice',
            question: 'What does the "return" keyword do?',
            options: [
              'Sends a value back from the function',
              'Prints a value',
              'Creates a variable',
              'Ends the program'
            ],
            correctAnswer: 0,
            explanation: 'return sends a value back to wherever the function was called.',
            xp: 10,
          },
          {
            id: 'f3-q2',
            type: 'predict-output',
            question: 'What will this print?',
            code: 'def square(n):\n    return n * n\n\nresult = square(4)\nprint(result)',
            options: ['4', '8', '16', 'None'],
            correctAnswer: 2,
            explanation: 'square(4) returns 16 (4 * 4), which is stored in result and printed.',
            xp: 15,
          },
          {
            id: 'f3-q3',
            type: 'bug-fix',
            question: 'This function should return the sum, but it prints None:',
            code: 'def add(a, b):\n    a + b\n\nprint(add(2, 3))',
            options: [
              'Add return before a + b',
              'Change + to *',
              'Remove print()',
              'The code is correct'
            ],
            correctAnswer: 0,
            explanation: 'Without return, the function returns None. Add "return a + b" to fix it!',
            xp: 20,
          },
          {
            id: 'f3-q4',
            type: 'fill-blank',
            question: 'Complete the function to return the larger number:',
            code: 'def maximum(a, b):\n    if a > b:\n        _____ a\n    else:\n        return b',
            correctAnswer: 'return',
            explanation: 'Use return to send back the larger value.',
            xp: 15,
          },
        ],
      },
    ],
  },
  {
    id: 'arrays',
    name: 'Lists',
    icon: '📋',
    description: 'Store collections of data',
    level: 0,
    maxLevel: 5,
    xpRequired: 900,
    xpEarned: 0,
    status: 'locked',
    position: { x: 50, y: 4 },
    connections: [],
    lessons: [
      {
        id: 'lists-1',
        title: 'Creating Lists',
        description: 'Store multiple items together',
        xp: 65,
        type: 'lesson',
        questions: [
          {
            id: 'li1-q1',
            type: 'multiple-choice',
            question: 'What is a list in Python?',
            options: [
              'A collection of items in order',
              'A single variable',
              'A type of loop',
              'A function'
            ],
            correctAnswer: 0,
            explanation: 'Lists store multiple items in a specific order, like a shopping list!',
            xp: 10,
          },
          {
            id: 'li1-q2',
            type: 'fill-blank',
            question: 'Create a list of three colors:',
            code: 'colors = _____"red", "green", "blue"_____',
            correctAnswer: '[]',
            explanation: 'Lists use square brackets [ ] to hold items separated by commas.',
            xp: 15,
          },
          {
            id: 'li1-q3',
            type: 'predict-output',
            question: 'What will this print?',
            code: 'fruits = ["apple", "banana", "cherry"]\nprint(len(fruits))',
            options: ['3', 'fruits', '["apple", "banana", "cherry"]', 'Error'],
            correctAnswer: 0,
            explanation: 'len() returns the number of items in the list. There are 3 fruits.',
            xp: 15,
          },
          {
            id: 'li1-q4',
            type: 'multiple-choice',
            question: 'Can a list contain different types of data?',
            options: [
              'Yes, lists can mix numbers, strings, etc.',
              'No, all items must be the same type',
              'Only numbers are allowed',
              'Only strings are allowed'
            ],
            correctAnswer: 0,
            explanation: 'Python lists are flexible! You can mix [1, "hello", 3.14, True].',
            xp: 10,
          },
        ],
      },
      {
        id: 'lists-2',
        title: 'Accessing Items',
        description: 'Get items by their position',
        xp: 70,
        type: 'lesson',
        questions: [
          {
            id: 'li2-q1',
            type: 'multiple-choice',
            question: 'What index is the first item in a Python list?',
            options: ['0', '1', '-1', 'first'],
            correctAnswer: 0,
            explanation: 'Python lists are zero-indexed, meaning the first item is at index 0!',
            xp: 10,
          },
          {
            id: 'li2-q2',
            type: 'predict-output',
            question: 'What will this print?',
            code: 'animals = ["cat", "dog", "bird"]\nprint(animals[1])',
            options: ['cat', 'dog', 'bird', 'Error'],
            correctAnswer: 1,
            explanation: 'Index 1 is the second item (remember, we start at 0), which is "dog".',
            xp: 15,
          },
          {
            id: 'li2-q3',
            type: 'predict-output',
            question: 'What will this print?',
            code: 'nums = [10, 20, 30, 40]\nprint(nums[-1])',
            options: ['10', '40', '30', 'Error'],
            correctAnswer: 1,
            explanation: 'Negative indices count from the end. -1 is the last item: 40.',
            xp: 15,
          },
          {
            id: 'li2-q4',
            type: 'fill-blank',
            question: 'Get the second item from the list:',
            code: 'letters = ["a", "b", "c"]\nprint(letters[_____])',
            correctAnswer: '1',
            explanation: 'The second item is at index 1 (first is 0, second is 1).',
            xp: 15,
          },
        ],
      },
      {
        id: 'lists-3',
        title: 'Modifying Lists',
        description: 'Add, remove, and change items',
        xp: 75,
        type: 'lesson',
        questions: [
          {
            id: 'li3-q1',
            type: 'multiple-choice',
            question: 'Which method adds an item to the end of a list?',
            options: ['append()', 'add()', 'insert()', 'push()'],
            correctAnswer: 0,
            explanation: 'append() adds an item to the end of a list. It\'s the most common way to add items!',
            xp: 10,
          },
          {
            id: 'li3-q2',
            type: 'predict-output',
            question: 'What will the list contain after this code?',
            code: 'nums = [1, 2, 3]\nnums.append(4)\nprint(nums)',
            options: ['[1, 2, 3]', '[4, 1, 2, 3]', '[1, 2, 3, 4]', '[1, 2, 4]'],
            correctAnswer: 2,
            explanation: 'append(4) adds 4 to the end, giving us [1, 2, 3, 4].',
            xp: 15,
          },
          {
            id: 'li3-q3',
            type: 'predict-output',
            question: 'What will the list contain?',
            code: 'colors = ["red", "green", "blue"]\ncolors[1] = "yellow"\nprint(colors)',
            options: [
              '["red", "yellow", "blue"]',
              '["yellow", "green", "blue"]',
              '["red", "green", "yellow"]',
              'Error'
            ],
            correctAnswer: 0,
            explanation: 'We replaced index 1 (green) with yellow.',
            xp: 15,
          },
          {
            id: 'li3-q4',
            type: 'bug-fix',
            question: 'We want to remove "banana" but there\'s an issue:',
            code: 'fruits = ["apple", "banana", "cherry"]\nfruits.remove("Banana")\nprint(fruits)',
            options: [
              'Change "Banana" to "banana" (lowercase)',
              'Use delete() instead',
              'Remove the quotes',
              'The code is correct'
            ],
            correctAnswer: 0,
            explanation: 'Python is case-sensitive! "Banana" ≠ "banana". Use the exact string.',
            xp: 20,
          },
        ],
      },
      {
        id: 'lists-4',
        title: 'List Loops',
        description: 'Loop through list items',
        xp: 80,
        type: 'practice',
        questions: [
          {
            id: 'li4-q1',
            type: 'predict-output',
            question: 'What will this print?',
            code: 'nums = [1, 2, 3]\nfor n in nums:\n    print(n * 2)',
            options: ['1 2 3', '2 4 6', '[2, 4, 6]', '6'],
            correctAnswer: 1,
            explanation: 'The loop prints each number multiplied by 2: 2, 4, 6 (on separate lines).',
            xp: 15,
          },
          {
            id: 'li4-q2',
            type: 'fill-blank',
            question: 'Complete the code to print each fruit:',
            code: 'fruits = ["apple", "banana"]\n_____ fruit in fruits:\n    print(fruit)',
            correctAnswer: 'for',
            explanation: 'Use "for" to iterate through each item in the list.',
            xp: 15,
          },
          {
            id: 'li4-q3',
            type: 'predict-output',
            question: 'What is the final value of total?',
            code: 'nums = [10, 20, 30]\ntotal = 0\nfor n in nums:\n    total += n\nprint(total)',
            options: ['10', '30', '60', '0'],
            correctAnswer: 2,
            explanation: 'total = 0 + 10 + 20 + 30 = 60. We added all the numbers together!',
            xp: 20,
          },
          {
            id: 'li4-q4',
            type: 'multiple-choice',
            question: 'How do you get both index and value when looping?',
            options: [
              'enumerate(list)',
              'index(list)',
              'both(list)',
              'list.items()'
            ],
            correctAnswer: 0,
            explanation: 'enumerate() gives you both the index and value: for i, val in enumerate(list)',
            xp: 15,
          },
        ],
      },
    ],
  },
];

// XP required for each level
export const levelXpRequirements = [
  0, 50, 150, 300, 500, 750, 1050, 1400, 1800, 2250, 2750, 3300, 4000, 4800, 5700, 6700, 7800, 9000, 10500, 12000
];

export function getXpForNextLevel(currentLevel: number): number {
  return levelXpRequirements[currentLevel] || levelXpRequirements[levelXpRequirements.length - 1];
}

export function getXpProgress(totalXp: number, level: number): number {
  const currentLevelXp = levelXpRequirements[level - 1] || 0;
  const nextLevelXp = levelXpRequirements[level] || levelXpRequirements[levelXpRequirements.length - 1];
  const xpInCurrentLevel = totalXp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  return Math.min(100, (xpInCurrentLevel / xpNeeded) * 100);
}
