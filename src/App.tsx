import { useState } from 'preact/hooks';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Dropdown } from './components/Dropdown';
import { Card } from './components/Card';
import { LoginDrawer } from './components/LoginDrawer';

export function App() {
  const [theme, setTheme] = useState<'brandA' | 'brandB'>('brandA');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div data-theme={theme} className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text-headings">
            Biglight Component Library
          </h1>
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium">
              Theme:
              <select
                value={theme}
                onChange={(e) => setTheme(e.currentTarget.value as 'brandA' | 'brandB')}
                className="ml-2 px-2 py-1 border rounded"
              >
                <option value="brandA">Brand A</option>
                <option value="brandB">Brand B</option>
              </select>
            </label>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
            <div className="flex gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
            <div className="max-w-md space-y-4">
              <Input label="Email" placeholder="Enter your email" />
              <Input label="Password" type="password" state="filled" value="password123" />
              <Input label="Error" state="error" errorMessage="This field is required" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Dropdowns</h2>
            <div className="max-w-md">
              <Dropdown
                label="Select Country"
                options={[
                  { value: 'us', label: 'United States' },
                  { value: 'uk', label: 'United Kingdom' },
                  { value: 'ca', label: 'Canada' },
                ]}
                placeholder="Choose a country"
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                title="Card Title"
                description="This is a promotional card with a button."
                buttonText="Learn More"
                buttonVariant="primary"
              />
              <Card
                title="Another Card"
                description="This card uses a secondary button."
                buttonText="Click Me"
                buttonVariant="secondary"
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Login Drawer</h2>
            <Button onClick={() => setIsDrawerOpen(true)}>
              Open Login Drawer
            </Button>
            <LoginDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              onSubmit={(data) => {
                console.log('Login:', data);
                setIsDrawerOpen(false);
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
