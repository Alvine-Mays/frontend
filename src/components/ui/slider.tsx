// src/components/ui/slider.tsx
import * as SliderPrimitive from '@radix-ui/react-slider'

interface SliderProps {
  min: number
  max: number
  step?: number
  defaultValue?: number[]
  formatLabel?: (value: number) => string
}

export const Slider = ({
  min,
  max,
  step = 1,
  defaultValue = [min, max],
  formatLabel,
  ...props
}: SliderProps) => {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div className="w-full space-y-3">
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={setValue}
        className="relative flex w-full touch-none select-none items-center"
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {value.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-5 w-5 rounded-full border-2 border-primary bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
      
      <div className="flex justify-between text-sm text-gray-500">
        <span>{formatLabel ? formatLabel(value[0]) : value[0]}</span>
        <span>{formatLabel ? formatLabel(value[1]) : value[1]}</span>
      </div>
    </div>
  )
}