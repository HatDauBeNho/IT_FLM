import time
from GPACaculation import GPACaculation
import os
from config import ConfigReader

if __name__ == "__main__":

    host, port, user, password, database = ConfigReader().get_config_postgres()
    sleep = ConfigReader().get_time_sleep
    
    print(host, port, user, password, database)

    thread_calculate = GPACaculation()
    thread_calculate.start()
    while (True):
        time.sleep(60)
        pass
