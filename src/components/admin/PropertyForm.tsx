'use client'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { MultiImageUpload } from '@/components/ui/multi-image-upload'
import { FeatureSelector } from '@/components/admin/FeatureSelector'

export function PropertyForm({
  onSubmit,
  initialValues
}: {
  onSubmit: (data: any) => void
  initialValues?: any
}) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: initialValues
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Titre"
          {...register('title', { required: 'Ce champ est requis' })}
          error={errors.title?.message}
        />
        
        <Select
          label="Type de bien"
          options={[
            { value: 'house', label: 'Maison' },
            { value: 'apartment', label: 'Appartement' },
            { value: 'villa', label: 'Villa' }
          ]}
          {...register('type')}
        />
      </div>
      
      <Textarea
        label="Description"
        rows={5}
        {...register('description', { required: 'Ce champ est requis' })}
        error={errors.description?.message}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Input
          label="Prix (€)"
          type="number"
          {...register('price', { required: 'Ce champ est requis', min: 0 })}
          error={errors.price?.message}
        />
        
        <Input
          label="Surface (m²)"
          type="number"
          {...register('surface', { required: 'Ce champ est requis', min: 0 })}
          error={errors.surface?.message}
        />
        
        <Input
          label="Pièces"
          type="number"
          {...register('rooms', { required: 'Ce champ est requis', min: 0 })}
          error={errors.rooms?.message}
        />
        
        <Input
          label="Chambres"
          type="number"
          {...register('bedrooms', { required: 'Ce champ est requis', min: 0 })}
          error={errors.bedrooms?.message}
        />
      </div>
      
      <Input
        label="Adresse"
        {...register('address', { required: 'Ce champ est requis' })}
        error={errors.address?.message}
      />
      
      <FeatureSelector control={control} name="features" />
      
      <MultiImageUpload control={control} name="images" />
      
      <div className="flex justify-end space-x-4 pt-6">
        <Button type="button" variant="outline">
          Annuler
        </Button>
        <Button type="submit">
          Enregistrer
        </Button>
      </div>
    </form>
  )
}