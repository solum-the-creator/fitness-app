import { Tag } from 'antd';

import styles from './tags-list.module.scss';

const { CheckableTag } = Tag;

export type TagsListProps = {
    title: string;
    tagsData: Array<{
        key: string;
        name: string;
    }>;
    selectedTag: string;
    onChange: (key: string) => void;
};

export type TagData = {
    key: string;
    name: string;
};

export const TagsList = ({ title, tagsData, selectedTag, onChange }: TagsListProps) => {
    const handleChange = (key: string) => {
        onChange(key);
    };

    return (
        <div className={styles.container}>
            <span className={styles.title}>{title}:</span>
            <div className={styles.tags_list}>
                {tagsData.map((tag) => (
                    <CheckableTag
                        className={styles.checkable_tag}
                        key={tag.key}
                        checked={tag.key === selectedTag}
                        onChange={() => handleChange(tag.key)}
                    >
                        {tag.name}
                    </CheckableTag>
                ))}
            </div>
        </div>
    );
};
