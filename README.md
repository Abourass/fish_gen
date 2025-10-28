# Fish Shell Prompt Generator

A beautiful, interactive web application built with SolidJS, Tailwind CSS, and Kobalte UI components that allows you to customize and download Fish shell prompt configurations.

![Fish Shell Prompt Generator](https://github.com/user-attachments/assets/91753ba1-8246-4897-82eb-cb4c9e3446b6)

## Features

- 🎨 **Interactive Configuration**: Customize every aspect of your Fish shell prompt
  - Toggle display options (username, hostname, path, git branch, time)
  - Choose from multiple path display styles (full, short, relative)
  - Customize colors for each prompt element
  - Set custom separator and prompt characters

- 👁️ **Live Preview**: See your prompt changes in real-time
- 📝 **Code Generation**: View the generated Fish shell script
- 💾 **One-Click Download**: Download your custom prompt configuration
- ✅ **Comprehensive Testing**: Full test coverage with Vitest
- 🎯 **Accessible UI**: Built with Kobalte for excellent accessibility

## Demo

Visit the live demo: [https://abourass.github.io/fish_gen/](https://abourass.github.io/fish_gen/)

## Screenshots

### Main Interface
![Main Interface](https://github.com/user-attachments/assets/91753ba1-8246-4897-82eb-cb4c9e3446b6)

### Generated Code View
![Generated Code](https://github.com/user-attachments/assets/60563402-2811-413e-866b-77d35d2cd2d4)

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Abourass/fish_gen.git
cd fish_gen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Usage

### Using the Web Application

1. Visit the application in your browser
2. Configure your prompt using the three tabs:
   - **Display Options**: Choose which elements to show
   - **Colors**: Select colors for each prompt element
   - **Style**: Customize path style and special characters
3. Preview your changes in real-time
4. Click "Download Config" to get your `fish_prompt.fish` file
5. Move the file to `~/.config/fish/functions/fish_prompt.fish`
6. Restart your Fish shell or run `source ~/.config/fish/config.fish`

### Configuration Options

#### Display Options
- **Show Username**: Display the current user's username
- **Show Hostname**: Display the machine's hostname
- **Show Path**: Display the current working directory
- **Show Git Branch**: Display the current git branch when in a repository
- **Show Git Status**: Change color based on git working directory status
- **Show Time**: Display the current time

#### Path Styles
- **Full Path**: `/home/user/projects/myapp`
- **Short Path**: `~/projects/myapp`
- **Relative**: `myapp`

#### Colors
Customize colors for:
- Username
- Hostname
- Path
- Git Branch
- Git Clean Status
- Git Dirty Status
- Time
- Separator
- Prompt Character

Available colors: black, red, green, yellow, blue, magenta, cyan, white, and their bright variants (brblack, brred, etc.)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run preview` - Preview production build

### Project Structure

```
fish_gen/
├── src/
│   ├── components/       # React components
│   │   ├── ConfigForm.tsx
│   │   ├── FormControls.tsx
│   │   └── PromptPreview.tsx
│   ├── test/            # Test files
│   │   ├── ConfigForm.test.tsx
│   │   ├── PromptPreview.test.tsx
│   │   ├── utils.test.ts
│   │   └── setup.ts
│   ├── App.tsx          # Main application component
│   ├── index.tsx        # Application entry point
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Pages deployment
└── public/              # Static assets
```

### Testing

The project includes comprehensive tests for all components and utilities:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

Test coverage includes:
- ✅ Prompt generation logic
- ✅ Component rendering
- ✅ User interactions
- ✅ Configuration updates
- ✅ Preview updates

## Technologies Used

- **[SolidJS](https://www.solidjs.com/)**: Reactive JavaScript framework
- **[Kobalte](https://kobalte.dev/)**: Accessible UI component library for SolidJS
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Vite](https://vitejs.dev/)**: Fast build tool
- **[Vitest](https://vitest.dev/)**: Fast unit testing framework
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with ❤️ using SolidJS, Kobalte, and Tailwind CSS
- Inspired by the Fish shell community
- Thanks to all contributors

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Abourass/fish_gen/issues) on GitHub.
