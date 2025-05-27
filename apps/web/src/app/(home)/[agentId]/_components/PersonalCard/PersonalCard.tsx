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
import { Chip } from '@repo/ui/Chip';
import { AGENT_TONE, AgentPersonalSetting } from '@web/types/agent';
import { Icon } from '@repo/ui/Icon';
import { isNotNil } from '@repo/ui/utils';
import { isEmptyStringOrNil } from '@web/utils';

export type PersonalCardProps = {
  data?: AgentPersonalSetting;
  onIconClick?: () => void;
};

export function PersonalCard({ data, onIconClick }: PersonalCardProps) {
  return (
    <motion.div
      className={card}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onIconClick}
    >
      <div className={cardText}>
        <div className={leftText}>
          <Text fontSize={22} fontWeight="semibold" color="grey800">
            개인화 설정
          </Text>
          <div className={chipArea}>
            {isNotNil(data) ? (
              <>
                {data.domain.length > 0 && (
                  <Chip className={chip} variant="grey">
                    {data.domain}
                  </Chip>
                )}
                <Chip className={chip} variant="grey">
                  {data.tone === 'CUSTOM'
                    ? data.customTone
                    : AGENT_TONE[data.tone]}
                </Chip>
              </>
            ) : (
              <>
                <Chip className={chip} variant="grey">
                  활동 분야
                </Chip>

                <Chip className={chip} variant="grey">
                  말투
                </Chip>
              </>
            )}
          </div>
        </div>
        {isNotNil(data) && (
          <Icon
            className={cursorPointer}
            name="pencil"
            size="2.4rem"
            color="grey300"
          />
        )}
      </div>
      <Text
        className={introductionText}
        fontSize={18}
        fontWeight="medium"
        color="grey400"
      >
        {isNotNil(data) && !isEmptyStringOrNil(data.introduction) ? (
          data.introduction
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
