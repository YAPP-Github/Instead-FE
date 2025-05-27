'use client';

import { Controller, Control } from 'react-hook-form';
import { CreateFormValues } from '../../types';
import { KeywordChipGroup } from '../KeywordChip/KeywordChipGroup';
import { useNewsCategoriesQuery } from '@web/store/query/useNewsCategoriesQuery';

type NewsCategorySectionProps = {
  control: Control<CreateFormValues>;
};

export function NewsCategorySection({ control }: NewsCategorySectionProps) {
  const { data: newsCategories } = useNewsCategoriesQuery();

  return (
    <Controller
      name="newsCategory"
      control={control}
      render={({ field: { value, onChange } }) => (
        <KeywordChipGroup
          items={newsCategories.data.map((category) => ({
            key: category.category,
            label: category.name,
          }))}
          value={value}
          onChange={(value) => onChange(value)}
        />
      )}
    />
  );
}
