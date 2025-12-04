# Web Interface

A minimal web interface for umalator-global-cli.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the CLI:

   ```bash
   npm run build
   ```

3. Start the web server:

   ```bash
   npm run web
   ```

4. Open your browser and navigate to:

<http://localhost:3000>

## Features

- **Config File Selection**: Dropdown to select from all JSON config files (excluding `config.example.json`)
- **Skills Editor**: Input fields for "discount" percentage
- **Track Editor**: Edit all track parameters (track name, distance, ground condition, weather, season, etc.)
- **Uma Editor**: Edit all uma parameters (stats, strategy, aptitudes, mood, unique skill, etc.)
- **Run Button**: Execute calculations and display terminal output in real-time

## Usage

1. Select a config file from the dropdown
2. Edit skills, track, and uma settings as needed
3. Click "Run Calculations" to execute
4. View the terminal output in the right panel

Changes are automatically saved to the config file when you run calculations.
