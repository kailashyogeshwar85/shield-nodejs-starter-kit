## Jobs
Job should be used for creating background job that will be processed by external processing engine.

## Dependencies
- EventBus (Genric EventBus eg: Kafka)


### API:
    - create(jobCategory: string, jobData: any): Promise<any>

NOTE: Processors should not be part of the same Service creating Jobs. Keep them separate for better scaling.
