import { useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './DropzoneButton.module.css';

export function DropzoneButton({ onSelectImage }: { onSelectImage: (file: File) => void },) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDrop = (files: File[]) => {
    const selectedFile = files[0];
    
    setSelectedImage(selectedFile.name);
    onSelectImage(selectedFile)
  };
  
  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>{selectedImage || 'Escolha uma imagem no formatos JPGE ou PNG'}</Dropzone.Accept>
            <Dropzone.Reject>Tamanho máximo 30mb</Dropzone.Reject>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            {selectedImage || 'Escolha uma imagem no formatos JPGE ou PNG'}
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="sm" radius="xl" onClick={() => openRef.current?.()}>
        Imagem
      </Button>
    </div>
  );
}