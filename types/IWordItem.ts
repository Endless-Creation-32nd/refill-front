export interface IWordItem {
  word: string;
  sense: [
    {
      sense_no: string;
      definition: string;
      pos?: string;
      link: string;
      type: string;
      cat?: string;
      origin?: string;
      syntacticArgument?: string;
      syntacticAnnotation?: string;
      target_code: number;
    }
  ];
}
