import { Button } from '@repo/ui/Button';
import { Icon } from '@repo/ui/Icon';
import { Text } from '@repo/ui/Text';
import Image, { StaticImageData } from 'next/image';
import { card, createCardText, createImage } from './CTACard.css';
import { motion } from 'motion/react';

export type CTACardPops = {
  text: string;
  buttonText: string;
  onButtonClick: () => void;
  imageSrc: StaticImageData;
};

export function CTACard({
  text,
  buttonText,
  onButtonClick,
  imageSrc,
}: CTACardPops) {
  return (
    <motion.div
      className={card}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className={createCardText}>
        <Text fontSize={22} fontWeight="semibold" color="grey800">
          {text}
        </Text>
        <Button
          variant="primary"
          size="large"
          leftAddon={<Icon name="twinkle" />}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
      <Image className={createImage} src={imageSrc} alt={'create image'} />
    </motion.div>
  );
}
