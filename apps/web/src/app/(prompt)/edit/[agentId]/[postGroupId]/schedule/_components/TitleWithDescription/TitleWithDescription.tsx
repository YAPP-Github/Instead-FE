import { Text } from '@repo/ui';
import * as style from './TitleWithDescription.css';

type TitleWithDescriptionProps = {
  title: string;
  rightTitle?: string;
  description: string;
};

export function TitleWithDescription({
  title,
  description,
  rightTitle,
}: TitleWithDescriptionProps) {
  return (
    <div className={style.textWrapperStyle}>
      <div className={style.titleWrapperStyle}>
        <Text.H2 fontSize={28} fontWeight="bold" color="grey1000">
          {title}
        </Text.H2>
        {rightTitle && (
          <Text.H2 fontSize={28} fontWeight="medium" color="grey400">
            {rightTitle}
          </Text.H2>
        )}
      </div>
      <Text.P fontSize={18} fontWeight="medium" color="grey500">
        {description}
      </Text.P>
    </div>
  );
}
