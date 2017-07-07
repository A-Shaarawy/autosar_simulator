export default {
    helpData: {
      content:[
          {'Q':'What is AUTOSAR?', 'A':"AUTOSAR (AUTomotive Open System ARchitecture) is an open and standardized automotive software architecture, developed by automobile manufacturers, suppliers and tool developers. The AUTOSAR-standard enables the use of a component based software design model for the design of a vehicular system.Software is tightly coupled with the ECU where it is going to be executed. If something is changed in the ECU, the software must be rewritten to suit with the hardware. It is problematic to buy software from one manufacturer and hardware from another, if they are not made to work with each other.So the applications are decoupled from the hardware (hardware independent) thanks to standardized interfaces that AUTOSAR can offer. With a standardized interface it would be possible to buy software and hardware from different manufacturers, and they would all work together. This would not be as smooth with the conventional solution."},
          {'Q':'What is the AUTOSAR workflow (AUTOSAR Methodology)?', 'A':`AUTOSAR requires some steps of system development. This approach is called the (AUTOSAR Methodology), which describes all major steps of the development of the system, from the system-level configuration to the generation of an ECU executable. There are two parallel flow of steps performed for every application software component (to be integrated later into the system).`},
          {'Q':'The first flow', 'A':`1.  System Configuration Input file(s): In XML format you should define your Software Components, Hardware Resources and System Constrains. You should take care that the format of the XML file(s) must compliant to AUTOSAR standards.
            1.1  Software Components: each software component requires a description of the software API e.g. data types, ports and interfaces.
            1.2  ECU Resources: each ECU requires specifications regarding e.g. the processor unit, memory, peripherals, sensors and actuators.
            1.3  System Constrains: regarding the bus signals, topology and mapping of belonging together software components.
          \n2.  The Configure System: An activity to map the software component to the ECUs with resources and timing requirements. 
          \n3.  System Configuration Description: This XML file includes all system and the information that must be agreed between different ECUs and the collection of the components to the ECUs. A system description is always completed by the necessary SWC (Software Component) Descriptions and an associated System Communication Matrix.
          \n4.  Extract ECU Specific Information: This activity to extract the information from the System Configuration Description for specific ECU.
          \n5.  ECU Extract of System Configuration: This XML file contains information from the System Configuration Description needed for specific ECU. It includes the description of the SWCs on this ECU as well as the subset of the communication matrix relevant for the ECU.
          \n6.  Configure ECU: This activity mainly deals with the configuration of the RTE (Real Time Environment) and the Basic Software modules. It add all implementation including task scheduling, required Basic Software modules, configuration of the Basic Software,  assignment of the runnable entities to tasks and etc. . The configuration is based on some files.
            6.1  ECU Extract of System Configuration: This file contain the all configurations for specific ECU.
            6.2  Collection of Available SWC Implementation: This file contain the implementation of all available SWCs for this ECU.
            6.3  BSW Module Description: The BSW Modules Description is assumed to consist of single description delivered together with the appropriate used BSW module. The detailed scheduling information or the configuration data e.g. the communication module, the operating system or AUTOSAR services have to be defined in this file. The next figure show you these files in details.
            6.4 Vendor Specific ECU Configuration Parameter Definition: Which contain all possible configuration parameters and their structure.
          \n7.  ECU Configuration Description: This describes all information that is local to specific ECU the runnable software can be built from this information and the code of the SWC.
          \n8.  Generate Executable: In last step an executable file is generated based on the configuration of the ECU described in the ECU Configuration Description.
          \n9.   ECU Executable: This file contain generated code (e.g. for the RTE and the Basic Software), compiled code (for generated code and software components) and linking everything together into an executable file.`},
          {'Q':'The second flow', 'A':`On the other hand the next flow be performed to be integrated later into the system this flow to generate the components API and implementing the components functionality.
          \n1.  Component Internal Behavior Description: The internal behavior describes the scheduling relevant aspects of a component e.g. the runnable entities and the events they respond to.
          \n2.   Generate Component API: In this step we aim to generate .h file (Component API).
          \n3.   Component API: This file contains all header declarations for the RTE communication.
          \n4.  Additional Headers: In this .h file contain the other header declarations.
          \n5.  Implement Component: Development of the component functionality and we will generate some files from this steps such as Component Internal Behavior Description,Component Implementation and Component Implementation Description. This implementation basically outside AUTOSAR. 
          \n6.  Component Internal Behavior Description: In this XML file we will find description of the component behavior.
          \n7.  Component Implementation: .c file for the implementation of the component.
          \n8.  Component Implementation Description: Description of the component implementation in XML file. And contains information about the further build process e.g. compiler settings and optimizations.
          \n9.  Compile Component: The integration of the previous three file is occurred in this step to generate the object file (compiled component) and XML file for description of this component.
          \n10. Compiled Component: This contains additional new build process information such as linker settings and the entry points.`},
          {'Q':'What is ARXML?', 'A':`.arxml files are a type of files used across AUTOSAR, to author and configure the AUTOSAR software. 
          ARXML stands for AUTOSAR XML, which is nothing but a schema with certain parameters, this schema is provided by AUTOSAR to standardize the process & increase portability.`},
          {'Q':'What is ARXML Structure?', 'A':`AUTOSAR attempts to allow for a very flexible yet stable and reliable software engineering lifecycle through precise and formal description of all relevant aspects of a distributed system of embedded controllers and the corresponding executed software units. 
          The descriptions range from high level requirements on interfaces of software components to low level constraints on certain bits of a specific bus message. 
          Various work packages in AUTOSAR determine the information that needs to be captured in the different descriptions.
          The ARXML schema supports a lot of elements, these elements are combined to describe a system, they are included inside AUTOSAR tags to define ARXML schema and AUTOSAR version.
            <AUTOSAR xmlns="http://autosar.org/3.2.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://autosar.org/3.2.1 autosar_3-2-1.xsd">
              .
              .
            </AUTOSAR>`},
          {'Q':'What are ARXML Elements?', 'A':`1.  Top Level Packages:This element is the container of all AUTOSAR elements that are added into the file.
            
            <TOP-LEVEL-PACKAGES>
              .
              .
              .
            </TOP-LEVEL-PACKAGES>
          \n2.  AUTOSAR Package:A package is the main component for AUTOSAR that contains the AUTOSAR elements that are related to each other like software component, its behavior and its supported datatypes, and it is defined by a name and a globally unique identifier called uuid. It may also contain sub packages.
            
            <AR-PACKAGE UUID="8348d5fa-cd36-5935-e72f-9ac3852cc24f">
              <SHORT-NAME>Package Name </SHORT-NAME>
            <SUB-PACKAGES>
              .
              .
              .
            </SUB-PACKAGES>
            <ELEMENTS>
              .
              .
              .
            </ELEMENTS>
            </AR-PACKAGE>
          \n3.  Application Software Component:This element describes the software component and its ports.
            
            <APPLICATION-SOFTWARE-COMPONENT-TYPE>
              <SHORT-NAME>Software Component Name</SHORT-NAME>
            <PORTS>
             .
             .
            </PORTS>
            </APPLICATION-SOFTWARE-COMPONENT-TYPE>
          \n4.  Internal behavior:This element describes the behavior of the software component, including its runnables and its events.
            
            <INTERNAL-BEHAVIOR UUID="d1f4ad0c-601b-11e7-bb4c-b88687f772a2">
              <SHORT-NAME>Behavior Name</SHORT-NAME>
            <EVENTS>
              .
              .
              .
            </EVENTS>
            <RUNNABLES>
              .
              .
              .
            </RUNNABLES>
            <COMPONTENT-REF DEST="APPLICATION-SOFTWARE-COMPONENT-TYPE">Reference to Software Component</COMPONTENT-REF>
            </INTERNAL-BEHAVIOR>
            \n5.  SWC Implementation:This element references the software component.
              
              <SWC-IMPLEMENTATION UUID="d1f4ad0b-601b-11e7-85a9-b88687f772a2">
                <SHORT-NAME>SWC Implementation Name</SHORT-NAME>
                <BEHAVIOR-REF DEST="INTERNAL-BEHAVIOR">Internal Behavior Reference</BEHAVIOR-REF>
              </SWC-IMPLEMENTATION>

            \n6. Sender Receiver Interface:This element describes a sender/receiver interface that declares many data elements to be sent and received.
              
              <SENDER-RECEIVER-INTERFACE> 
                <SHORT-NAME>Interface Name</SHORT-NAME> 
              <DATA-ELEMENTS> 
                .
                .
                .
              </DATA-ELEMENTS> 
              </SENDER-RECEIVER-INTERFACE>
            \n7.  P Port Prototype:This element describes a provider port for a software component and it  is linked to an interface.
              
              <P-PORT-PROTOTYPE UUID="267fcece-30be-43e5-a349-8dcadbc78af1">
                <SHORT-NAME>P Port Name</SHORT-NAME>
                <PROVIDED-INTERFACE-TREF DEST="SENDER-RECEIVER-INTERFACE">Interface Reference</PROVIDED-INTERFACE-TREF>
              </P-PORT-PROTOTYPE>

            \n8.  R Port Prototype:This element describes a requester port for a software component and it is linked to an interface.
              
              <R-PORT-PROTOTYPE UUID="267fcece-30be-43e5-a349-8dcadbc78af1">
                <SHORT-NAME>R Port Name</SHORT-NAME>
                <PROVIDED-INTERFACE-TREF DEST="SENDER-RECEIVER-INTERFACE">InterfaceReference</PROVIDED-INTERFACE-TREF>
              </R-PORT-PROTOTYPE>

            \n9.  DataType:This element describes the computer system data types, such as Boolean or Float, that represent the physical values connected to the port interfaces
              
              <INTEGER-TYPE>
                <SHORT-NAME>Int32</SHORT-NAME>
                <LOWER-LIMIT INTERVAL-TYPE="CLOSED">-2147483648</LOWER-LIMIT>
                <UPPER-LIMIT INTERVAL-TYPE="CLOSED">2147483647</UPPER-LIMIT>
              </INTEGER-TYPE>
              <BOOLEAN-TYPE>
                <SHORT-NAME>Boolean</SHORT-NAME>
              </BOOLEAN-TYPE> 

            \n10. DataElement:This element describes the variables associated with each interface, these can be assigned to each of the ports accessing this interface, and then they can be read/written on by the runnable entities
              
              <DATA-ELEMENTS>
                <DATA-ELEMENT-PROTOTYPE>
                <SHORT-NAME>RegulatorValue</SHORT-NAME>
                <TYPE-TREF DEST="INTEGER-TYPE">/CrossControl/Datatypes/Int32</TYPE-TREF>
                <IS-QUEUED>false</IS-QUEUED>
                </DATA-ELEMENT-PROTOTYPE>
              </DATA-ELEMENTS>

            \n11. Runnable:Runnables are the callable function that are mapped to certain events. These functions are the actual implementation for the functionalities of the SWC.
              
              <RUNNABLES>
                <RUNNABLE-ENTITY>
                <SHORT-NAME>SeatSensorMain</SHORT-NAME>
                <CAN-BE-INVOKED-CONCURRENTLY>false</CAN-BE-INVOKED-CONCURRENTLY>
                <DATA-READ-ACCESSS>
                  .
                  .
                  .
                </DATA-READ-ACCESS>
                <DATA-WRITE-ACCESS>
                  .
                  .
                  .
                </DATA-WRITE-ACCESS>
                <SYMBOL>SeatSensorMain</SYMBOL>
                </RUNNABLE-ENTITY>
              </RUNNABLES>

            \n12. Data Access:These are the elements that define which data elements each runnable has access to. Access can be either WRITE to Data Elements associated to Provider Ports, or READ from Data Elements associated to Requester Ports.
               
              <DATA-READ-ACCESS>  
                <DATA-READ-ACCESS>  
                  <SHORT-NAME>SensorIOReadAccess</SHORT-NAME>                       
                  <DATA-ELEMENT-IREF>
                    <R-PORT-PROTOTYPE-REF DEST="R-PORTPROTOTYPE">/CrossControl/SoftwareComponents/SeatSensor/SensorIO</R-PORT-PROTOTYPE-REF>
                    <DATA-ELEMENT-PROTOTYPE-REF DEST="DATA-ELEMENTPROTOTYPE">/CrossControl/Interfaces/ISensorIO/SensorValue</DATA-ELEMENT-PROTOTYPE-REF>
                  </DATA-ELEMENT-IREF>
                </DATA-READ-ACCESS>
              </DATA-READ-ACCESSS>
              <DATA-WRITE-ACCESSS>
                <DATA-WRITE-ACCESS>
                  <SHORT-NAME>StatusWriteAccess</SHORT-NAME>  
                  <DATA-ELEMENT-IREF>
                    <P-PORT-PROTOTYPE-REF DEST="P-PORTPROTOTYPE">/CrossControl/SoftwareComponents/SeatSensor/Status</P-PORT-PROTOTYPE-REF>
                    <DATA-ELEMENT-PROTOTYPE-REF DEST="DATA-ELEMENTPROTOTYPE">/CrossControl/Interfaces/ISeatStatus/PassengerOnSeat</DATA-ELEMENT-PROTOTYPE-REF>
                  </DATA-ELEMENT-IREF>
                  </DATA-WRITE-ACCESS>
              </DATA-WRITE-ACCESSS>`}
      ]
    },
    indexData:{
        content:[
            {'Q':'What is AUTOSAR?'},
            {'Q':'What is the AUTOSAR workflow (AUTOSAR Methodology)?'},
            {'Q':'The first flow'},
            {'Q':'The second flow'},
            {'Q':'What is ARXML Structure?'},
            {'Q':'What are ARXML Elements?'}
        ]
    }
};