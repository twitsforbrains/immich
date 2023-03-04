export const IMachineLearningRepository = 'IMachineLearningRepository';

export interface MachineLearningInput {
  thumbnailPath: string;
}

export interface IMachineLearningRepository {
  tagImage(input: MachineLearningInput): Promise<string[]>;
  detectObjects(input: MachineLearningInput): Promise<string[]>;
  encodeCLIPModel(input: MachineLearningInput): Promise<number[]>;
}
