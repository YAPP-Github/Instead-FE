import { Text } from '@repo/ui/Text';
import {
  card,
  cardText,
  chip,
  chipArea,
  cursorPointer,
  introductionText,
  leftText,
} from './PersonalCard.css';
import { motion } from 'motion/react';
import { AgentTone } from '@web/types';
import { Chip } from '@repo/ui/Chip';
import { AGENT_TONE } from '@web/types/agent';
import { Icon } from '@repo/ui/Icon';

export type PersonalCardPops = {
  text: string;
  domain: string;
  tone: AgentTone;
  customTone?: string;
  introduction?: string;
  onIconClick: () => void;
};

export function PersonalCard({
  text,
  domain,
  tone,
  introduction,
  customTone,
  onIconClick,
}: PersonalCardPops) {
  return (
    <motion.div
      className={card}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className={cardText}>
        <div className={leftText}>
          <Text fontSize={22} fontWeight="semibold" color="grey800">
            {text}
          </Text>
          <div className={chipArea}>
            <Chip className={chip} variant="grey">
              {domain}
            </Chip>
            <Chip className={chip} variant="grey">
              {tone === 'CUSTOM' ? customTone : AGENT_TONE[tone]}
            </Chip>
          </div>
        </div>
        <Icon
          className={cursorPointer}
          name="pencil"
          size="2.4rem"
          color="grey300"
          onClick={onIconClick}
        />
      </div>
      <Text
        className={introductionText}
        fontSize={18}
        fontWeight="medium"
        color="grey400"
      >
        {introduction ? (
          introduction
        ) : (
          <>
            글을 생성할 때 계정과 관련된 업데이트나 소식을 참고하고 <br />
            특정 활동 분야에 집중하거나, 특정 말투를 사용하여 글을 만들 수
            있어요
          </>
        )}
      </Text>
    </motion.div>
  );
}
